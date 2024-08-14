from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import Updater, CommandHandler, CallbackQueryHandler, CallbackContext
import logging

# Enable logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)

def start(update: Update, context: CallbackContext) -> None:
    # Get the user's username
    user = update.message.from_user
    username = user.username if user.username else 'No username'
    
    # Log the username
    logging.info(f'User started the bot: {username}')
    
    keyboard = [[InlineKeyboardButton("Play", url="http://localhost:8000")]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    update.message.reply_text('Welcome to Albert Test Game! Press the button below to play:', reply_markup=reply_markup)

def main() -> None:
    updater = Updater("5143928828:AAHCL5jM0qmikrwdjJDifvuS0_QpAT_5tVA", use_context=True)
    dispatcher = updater.dispatcher

    dispatcher.add_handler(CommandHandler('start', start))

    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()
