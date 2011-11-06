# Semaphore.js

Semaphore.js is light-weight javascript widget that your the status of your server using async calls to it.

It's very useful for ajax apps and single page apps that relies on unstable servers, or that uses third-party services that go offline often.

It shows a very simple widget that indicates if the service is down, up or slow with lights on it.

## Usage

It is very simple to use, just download and load the semaphore.js on your page:

    <script src="semaphore.js" type="text/javascript"></script>

Them start the semaphore at the end of the html, passing your configuration:

    <script type="text/javascript">
        semaphore({url: "ok.php"});
    </script>

The mandatory configuration is a URL that will respond with the server status. 

If everything is fine the URL must respond to a GET with a 200 status code and just "ok" as the text. Any other response will be considered an error.

You can test your connection to the database, access third-party services or any other test that your app need to run.

## Options

Semaphore allow a few more options:

- **interval** configures the interval between each semaphore check to the url
- **timeout** configures the timeout to consider when loading the url
- **timealert** configures the timeout to consider the load slow, but not error
- **onerror** a function to be called when server returns an error
- **onsuccess** a function to be called when server returns with success
- **ontimeout** a function to be called on timeout
- **ontimealer** a function to be called on slow responses, but no error yet
- **onlineText** text to display if server is online
- **offlineText** text to display if server is down
- **slowText** text to display if server is slow
- **onlineColor** color to display if server is online
- **offlineColor** color to display if server is down
- **slowColor** color to display if server is slow

You can also style the semaphore using css (but with important statement, for now) all under .x-semaphore class.

