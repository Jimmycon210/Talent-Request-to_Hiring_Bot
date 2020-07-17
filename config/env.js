const { optional, required } = require('@polyn/blueprint');
const { immutable } = require('@polyn/immutable');

const VALID_ENVS = /^(local|test|development|production)$/;

if (!VALID_ENVS.test(process.env.NODE_ENV)) {
  throw new Error(
    `Expected NODE_ENV {${process.env.NODE_ENV}} to match "/^(local|test|development|production)$/"`
  );
}

const Envvars = immutable('Envvars', {
    NODE_ENV: VALID_ENVS,
    NODE_ENV_OPTIONS: required('any').from(() => {
      return {
        LOCAL: 'local',
        TEST: 'test',
        DEV: 'development',
        PROD: 'production',
      };
    }),
    PROTOCOL: /^(http|https)$/,
    DOMAIN: 'string',
    PORT: optional('string').withDefault('3000'),
    SLACK_CLIENT_ID: 'string',
    SLACK_CLIENT_SECRET: 'string',
    SLACK_SIGNING_SECRET: 'string',
    SLACK_BOT_TOKEN:'string',
    SLACK_BOT_SCOPES: required('string[]').from(() => [
      'commands',
      'users:read',
      'chat:write',
      'app_mentions:read',
      'users:read.email',
      'team:read',
    ]),
    SLACK_USER_SCOPES: required('string[]').from(() => [
      'users:read',
      'users:read.email',
      'chat:write',
      'team:read',
    ]),
    GOOGLE_CONFIG: 'string',
    OFFICE_REOPENING_CHANNEL_ID: 'string',
    SPREADSHEET_ID: 'string',
});

module.exports = new Envvars(process.env);