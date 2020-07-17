const { App } = require('@slack/bolt');
require('dotenv').config();
const testCommand = require('./actions/testCommand');
const appMentioned = require('./actions/appMentioned');
const fs = require('fs');
const logger = require('../visualizations/logger');
const shortid = require('shortid');

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const onEveryRequest = (args) => {
    const { context, next } = args;
    const logContext = {
        requestId: shortid.generate(),
    };

    Object.assign(logContext, context.user);

    if (args.command) {
        logContext.command = args.command.command;
    } else if (args.action) {
        logContext.action = args.action.action_id || args.action.callback_id;
    } else if (args.view) {
        logContext.callback_id = args.view.callback_id;
    } else if (args.event) {
        logContext.event = args.event.type;
    }

    logger.emit('bolt_request', 'info', logContext);

    next();
};

function initListeners() {
    app.command('/test', testCommand);
    app.event('app_mention', appMentioned)
}

function jsonInit() {
    fs.writeFile('./google-credentials.json', process.env.GOOGLE_CONFIG, (err) => {});
}

function startServer() {
    (async() => {
        //Start app
        await app.start(process.env.PORT || 3000);
        logger.emit(
            'app_startup',
            'info',
            `Bolt server listening`
        );
        // console.log('Bolt app is up and running!');
    })();
}

app.use(onEveryRequest)
jsonInit();
initListeners();
startServer();