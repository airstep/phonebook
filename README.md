# Hi!

So, this is just simple demo app - Phonebook.

You can generate new contacts just in one press on 'generate' or 'here' words.

Or create one by one contact by pressing (+) fab button at the right bottom corner.

This is crossplatform application created on [Ionic 3](ionicframework.com) ('client' - with [lazy page](https://www.javascripttuts.com/ionic-3-new-pages-lazy-loading/) loading) - you can build it for iOS, android, web and many other systems...

Backend is on [node.js](https://nodejs.org/) - and it is in 'server' folder.

Also you can use search bar - for realtime search of created contacts.

Also you can delete any contact - just press on item and drag it to the left direction.

By the way, any new created contact will be placed at the top of contact list.

How to use this?

## Server side

Install MongoDB like in [ArchLinux](https://wiki.archlinux.org/index.php/MongoDB) or [Ubuntu](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/) articles

Run service, then:

```bash
$ mongo
```

Create new user:

db.createUser(
   {
     user: "test",
     pwd: "testme",
     roles: [ "readWrite", "dbAdmin" ]
   }
)

After that just run step by step such commands:
```bash
$ cd server

$ npm install

$ node server.js
```
wait for message: 'Listening on port 8080'

if you wish just to run tests, then press Ctrl+C (to stop server) and run:
```bash
$ npm test
```

## Client side

Install ionic

```bash
$ npm install ionic@latest -g

$ cd client

$ npm install

$ ionic serve
```

wait when browser brings to front our application page

If you wish to build client on other platform:

```bash
$ ionic cordova platform add android

$ ionic cordova run android
```

Or instead 'android' use 'ios' etc.

# Thank you!
