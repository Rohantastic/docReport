from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data['message']
    if user_message == 'Hello' or 'Hi':
        bot_response = f"Bot: Hey how may i help you?"
    elif user_message == 'what is your name?':
        bot_response = f"Bot: my name is rebecca"
    else:
        bot_response = f"Bot: Can't understand what you're saying'"

    return jsonify({'response': bot_response})

if __name__ == '__main__':
    app.run(debug=True)