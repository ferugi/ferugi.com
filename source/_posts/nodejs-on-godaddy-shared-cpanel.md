title: Installing Node.js on GoDaddy Shared Hosting
fbcommentlink: "http://ferugi.com/2016/02/18/nodejs-on-godaddy-shared-cpanel/index.html"
categories:
    - Web Development

tags: 
- Linux
- Node.js
- Backend
- Javascript
- NPM
- NVM
- Guide
---

The common response to the question *"How do I install Node.js on GoDaddy shared hosting?"* is *"it's impossible!"*.

**Well, it’s not, in fact it’s easy!** After struggling for hours I finally found [this awesome guide](http://www.nearform.com/nodecrunch/nodejs-sudo-free/). 

These are the steps I took specifically for GoDaddy cPanel Shared hosting.
<!--more-->
## Installation
*Disclaimer: I take no responsiblity for any damages or any other liability. These are only the steps that I took, if you follow them, you do so at **entirely** your own risk.*

### Step 1: Get Shell Access
First access you server's shell through SSH. Instructions for cPanel are [here](https://uk.godaddy.com/help/enable-ssh-16102). I'm on Windows 10, so I used [PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html).

### Step 2: Check for Previous Installs
By the time you're reading this, GoDaddy may already install Node.js. So, lets make sure node, npm or nvm are not already installed. In the **bash shell enter**:
`which node`
`which npm`
`which nvm`

If they return nothing you're good to carry on.

### Step 3: Install Node Version Manager
[Node Version Manager](https://github.com/creationix/nvm) allows Node.js installation **without** the need for root access via the `sudo`.

I installed this in my home directory i.e. /home/username/ to get here you can enter. 
To install **enter in bash**:

`curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash`

*Check the NVM GitHub page for instructions on installing a newer version*

To make sure it's installed enter
`nvm --version`

### Step 4: Installing Node.js
Now we can get around to installing Node.js .  To install the latest version **enter in bash**: 
`nvm install node`
You can now set this as the default **via bash**:
`nvm alias default node`

To check that worked **enter in bash**:
`node -v`
`npm -v`

Both should return their versions. Before we get our hopes up, we'll likely need to do some configuration.

## Configuration
Once I'd finally got Node.js installed I encountered problems running NPM 
packages globally. The solution was to add some lines to environment variables. 
### Step 5: Check NPM Globals
The default location for global packages is home/yourusername/local/bin . You'll be able to see where your global packages are installed. To check if that's needed **enter in bash**:

`npm list -g`

If you're receiving the message along the lines of `not found in $PATH` you will be unable to run global packages. 

### Step 6: Add to Bash Startup
To fix that **add the following line to the file .bashrc** which is located in your home directory (remember to alter it if your global package directory is different):
`export PATH="$PATH:$HOME/local/bin"`


## Conclusion
Finally I could use Node.js and NPM as I pleased! The irony, to all of this, is that I didn't need Node running on my webserver. 

All I wanted to do was get this blog up and running with Hexo. On the other hand, lesson learned, and hopefully this information will prove useful to others. It does also mean that Node.js is available for use in the future, should the need arise.

Lastly for laughs [here's](https://gist.github.com/isaacs/579814) some of the approaches that **didn't** work.
* `sudo apt-get install nodeJs` - I couldn't use sudo because I don't have root access. That much is obvious. 
* Download latest build and `make install` - I *could* download the latest binaries to the server, but couldn't build, because the GCC compiler version is too old.
