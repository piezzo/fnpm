# fnpm
fnpm is a very simple bitcoin full node monitor node written in nodejs.

The suppose is to give statistics on in Traffic and connected peers on systems running either bitcoind or btcd instances - and to teach me some javascript.

# Quickstart

Assuming you already have nodejs installed (if not, get it from https://nodejs.org/):

    download and unzip.
    change into project directory.
    edit config file config/default.json and adapt to your system.
    $ npm install
    $ npm start
    
If you connect to http://localhost:3000/getpeerinfo you should see a nice visualization of the cli-command getpeerinfo and see something like this:

![fnpm screenshot](https://raw.githubusercontent.com/piezzo/fnpm/master/fnpm_screenshot.png "screenshot")
