print('inside')
import time
from telethon import TelegramClient, events

# sample API_ID from https://github.com/telegramdesktop/tdesktop/blob/f98fdeab3fb2ba6f55daf8481595f879729d1b84/Telegram/SourceFiles/config.h#L220
# or use your own
api_id = 863495
api_hash = 'bdb202c7e2e70dfe9a88cb9edd9c834a'

# fill in your own details here
phone = '+917200744553'
username = 'Sriram J'

# content of the automatic reply
message = "Sriram J, is currently offline. Thanks for your message, i ll notify my boss. he ll reply to you asap. Have a good day !"


def main():
    # Create the client and connect
    client = TelegramClient(username, api_id, api_hash)
    client.start(phone)

    @client.on(events.NewMessage(incoming=True))
    def _(event):
        if event.is_private:
            print(time.asctime(), '-', event.message)  # optionally log time and message
            time.sleep(1)  # pause for 1 second to rate-limit automatic replies
            client.send_message(event.message.from_id, message)

    print(time.asctime(), '-', 'Auto-replying...')
    client.run_until_disconnected()
    print(time.asctime(), '-', 'Stopped!')


if __name__ == '__main__':
    main()
