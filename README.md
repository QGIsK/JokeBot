# JokeBOT

## • Information
Currently only a discord bot, will most likely add a telegram bot next time im bored.

Hosted on heroku with worker.
MongoDB database on MongoCloud

## • Hosted version
Click [here](https://discord.com/oauth2/authorize?client_id=896816739336196208&permissions=0&scope=bot%20applications.commands) to invite the bot to your server

## • Local version installation

### • Prerequisites

```bash
NodeJS > 16.0.0
NPM > 7.4.0
Local MongoDB
```

For the discord tokens Please follow [this tutorial](https://discordjs.guide/preparations/setting-up-a-bot-application.html).

### • Configuration

```bash
cp .env-example .env
```

or 

```bash
copy the .env-example and rename the file to .env
```

Paste your tokens/id in the newly created .env file
Don't forget your mongodb url and server(discord guild) id

Replace the ```<your bot id here>``` in the discord invite link with your bot's id.


## • Using the bot

### • Register Commands
```bash
node deployCommands.js
```

### • Starting the bot
```bash
npm start
```

or ( This requires you to install nodemon) ```npm -i -g nodemon```  

```bash
npm run dev
```
