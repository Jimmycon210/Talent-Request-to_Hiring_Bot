
async function testCommand({ context, client, ack, body }) {
    try{
        await ack();
        client.chat.postMessage({
            token: context.botToken,
            channel: body.user_id,
            text: 'Test Command works!',
        });
    } catch(error) {
        console.error(error);
        throw error;
    }
}

module.exports = testCommand;