# Cylon.js For APLS Multi Sensor Module

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics and
physical computing using Node.js

This repository contains the Cylon driver for the APLS Multi Sensor Module.

For more information about Cylon, check out the repo at
https://github.com/hybridgroup/cylon

## How to Install

To connect to the APLS Multi Sensor Module with Cylon, you'll need to install the `cylon-alps-multi-sensor` NPM module.
You will also need to bundle in `cylon-ble`, which is needed to communicate with the device.

    $ npm install cylon-ble cylon-alps-multi-sensor

## How to Use

Here's a short example of getting data from the APLS Multi Sensor Module with Cylon:

```javascript
var Cylon = require('cylon');

Cylon.robot({
  connections: {
    bluetooth: { adaptor: 'ble', uuid: '207377654321' }
  },

  devices: {
    apls: { driver: 'alps-multi-sensor' }
  },

  work: function(my) {
    my.apls.getData(function(err, data) {
      if (!!err) {
        console.log("Error: ", err);
        return;
      }

      console.log("Data: ", data);
    });
  }
}).start();
```

## How to Connect

The APLS Multi Sensor Module is a Bluetooth Low-Energy device, and is paired and connected as with any other BLE device. As long as you have the needed hardware in your computer for Bluetooth LE (Bluetooth 4.0), you can connect to the APLS Multi Sensor Module.

For more info, check out the [BLE platform page](http://cylonjs.com/documentation/platforms/ble).

## Documentation

We're busy adding documentation to our web site at http://cylonjs.com/ please check there as we continue to work on Cylon.js

Thank you!

## Contributing

* All patches must be provided under the Apache 2.0 License
* Please use the -s option in git to "sign off" that the commit is your work and you are providing it under the Apache 2.0 License
* Submit a Github Pull Request to the appropriate branch and ideally discuss the changes with us in IRC.
* We will look at the patch, test it out, and give you feedback.
* Avoid doing minor whitespace changes, renamings, etc. along with merged content. These will be done by the maintainers from time to time but they can complicate merges and should be done seperately.
* Take care to maintain the existing coding style.
* Add unit tests for any new or changed functionality & lint and test your code using `make test` and `make lint`.
* All pull requests should be "fast forward"
  * If there are commits after yours use “git rebase -i <new_head_branch>”
  * If you have local changes you may need to use “git stash”
  * For git help see [progit](http://git-scm.com/book) which is an awesome (and free) book on git

## Release History

Version 0.1.0 - Initial release

## License

Copyright (c) 2015 Studio Arcana co.,Ltd. Licensed under the Apache 2.0 license.
