# fantastic-template
By fantastic-template you can start creating your project much faster

#### All you need to do is install node.js and then type `npm install -g gulp-cli`. Afterwards you can type `npm install` in folder with package.json for installing all dependencies. After sucesfull installation you can run all gulp tasks. ####

<hr>

fantastic-template contains:  
- **public** - here is place for your distribution version, that is prepared by gulp task `gulp build`   
- **source** - your main project, here you will include all your changes
  - **css** - all your css files and basically included normalize.css
  - **img** - all your images
  - **js** - here are all your JavaScript files
    - **plugins** - this is place for your all additionally plugins, that you do not want to be compressed
  - **sass** - your sass files
    - **mixins & variables** - as the name says, additionally these files will not transpiled and they are already included in main.scss
  - **tools** - rest of your failes e.g. fonts
  - **index.html** - it has basic HTML 5 template, included all necessary files and meta that supports media queries
- **.gitignore** - basically contains ignoring for node_modules folder
- **gulpfile.js** - all your tasks, that you can run by typing `gulp` or `gulp build`
  - `gulp` contains
    - transpiler SASS to CSS
    - compressing CSS files
    - autoprefixer
    - browserSync
    - watcher
  - `gulp build` contains
    - cleaning public folder
    - copying all necessary files to public
    - minimizing images and js, html files
    - transpiling from ES6 to ES5 by Babel
  - additionally you can run `gulp build` with flag `gulp build --upload` and you will send your files into ftp server, if you want to do this, you must configure your connection in gulpfile.js
  - of course you can run all your tasks separately, for more informations look at gulpfile.js
- **package.json** - here are all dependencies needed for proper working your tasks
