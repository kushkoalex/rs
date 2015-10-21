module.exports = function (grunt) {
    var publicDir ='../public/',
        pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({
        pkg: pkg,
        version:pkg.version,
        sourceDir: '../sources/',
        publicDir:publicDir,
        prodBuildDir: '../../riskSim-build/',
        scriptsDir: publicDir + 'scripts/',
        vendorDir: publicDir + 'vendor/',
        stylesDir: publicDir + 'styles/',
        copy:{
            htmlDevSource:{
                expand: true,
                cwd: '<%= sourceDir %>',
                src: ['**/*.html'],
                dest: '<%= publicDir %>'
            },
            images: {
                expand: true,
                cwd: '<%= publicDir %>images/',
                src: '**',
                dest: '<%= prodBuildDir %>images/'
            },
            vendorScripts:{
                expand: true,
                cwd: '<%= publicDir %>vendor/scripts/',
                src: '**',
                dest: '<%= prodBuildDir %>scripts/vendor/'
            },
            vendorStyles:{
                expand: true,
                cwd: '<%= publicDir %>vendor/styles/',
                src: '**',
                dest: '<%= prodBuildDir %>styles/vendor/'
            },
            //fonts: {
            //    expand: true,
            //    cwd: '<%= publicDir %>fonts/',
            //    src: '**',
            //    dest: '<%= prodBuildDir %>fonts/'
            //},
            data: {
                expand: true,
                cwd: '<%= publicDir %>data/',
                src: '**',
                dest: '<%= prodBuildDir %>data/'
            },
            htmlSource: {
                expand: true,
                cwd: '<%= sourceDir %>',
                src: ['**/*.html'],
                dest: '<%= prodBuildDir %>'
            }
        },
        includes:{
            dev: {
                files: [
                    {
                        cwd: '<%= publicDir %>',
                        src: '**/*.html',
                        dest: '<%= publicDir %>'
                    }
                ]
            },
            prod: {
                files: [
                    {
                        cwd: '<%= prodBuildDir %>',
                        src: '**/*.html',
                        dest: '<%= prodBuildDir %>'
                    }
                ]
            }
        },
        tags:{
            buildDevScripts:{
                options: {
                    scriptTemplate: '    <script type="text/javascript" src="{{path}}?v=<%= version %>"></script>',
                    openTag: '<!-- start script template tags -->',
                    closeTag: '<!-- end script template tags -->'
                },
                src: [
                    //'<%= scriptsDir %>constants/constantsDefine.js',
                    //'<%= scriptsDir %>constants/**/*.js',
                    '<%= scriptsDir %>gt/GT.js',
                    '<%= scriptsDir %>gt/helpers/**/*.js',
                    //'<%= scriptsDir %>gt/UIComponents/**/*.js',
                    //'<%= scriptsDir %>gt/masking/masking.js',
                    //'<%= scriptsDir %>gt/masking/masks/decimal.js',
                    //'<%= scriptsDir %>gt/masking/masks/**/*.js',
                    //'<%= scriptsDir %>gt/masking/**/*.js',
                    //'<%= scriptsDir %>gt/validation/validation.js',
                    //'<%= scriptsDir %>gt/validation/helpers/**/*.js',
                    //'<%= scriptsDir %>gt/validation/microvalidators/**/*.js',
                    //'<%= scriptsDir %>gt/validation/validators/dependency/dependency.js',
                    //'<%= scriptsDir %>gt/validation/validators/**/*.js',
                    //'<%= scriptsDir %>gt/validation/**/*.js',
                    //'<%= scriptsDir %>libs/awareness/**/*.js',
                    //'<%= scriptsDir %>libs/faith/**/*.js',
                    '<%= scriptsDir %>libs/cnCt/**/*.js',
                    //'<%= scriptsDir %>libs/jmForms/jmForms.js',
                    //'<%= scriptsDir %>libs/jmForms/helpers/**/*.js',
                    //'<%= scriptsDir %>libs/jmForms/commonTmpls/microTmpls.js',
                    //'<%= scriptsDir %>libs/jmForms/commonTmpls/**/*.js',
                    //'<%= scriptsDir %>libs/jmForms/fields/**/*.js',
                    //'<%= scriptsDir %>libs/jmForms/indications/**/*.js',
                    //'<%= scriptsDir %>riskSim/defined/**/*.js',
                    '<%= scriptsDir %>riskSim/RS.js',
                    '<%= scriptsDir %>riskSim/modules/**/*.js',
                    '<%= scriptsDir %>riskSim/elements/**/*.js',
                    '<%= scriptsDir %>riskSim/**/*.js',
                    '<%= vendorDir %>scripts/jquery-1.7.min.js',
                    '<%= vendorDir %>scripts/jquery-ui-1.10.3.min.js',
                    '<%= vendorDir %>scripts/jquery.event.drag-2.2.js',
                    '<%= vendorDir %>scripts/slick.core.js',
                    '<%= vendorDir %>scripts/slick.dataview.js',
                    '<%= vendorDir %>scripts/slick.grid.js',
                    //'<%= vendorDir %>scripts/parallax.min.js',
                    '<%= scriptsDir %>init.js'
                ],
                dest: '<%= publicDir %>includes/scripts.html'
            },
            buildDevLinks: {
                options: {
                    linkTemplate: '    <link rel="stylesheet" type="text/css" href="{{path}}?v=<%= version %>" media="screen"/>',
                    openTag: '<!-- start css template tags -->',
                    closeTag: '<!-- end css template tags -->'
                },
                src: [
                    //'!<%= stylesDir %>_services/**/*.css',
                    '<%= stylesDir %>default.css',
                    //'<%= stylesDir %>ui/default/*.css',
                    '<%= stylesDir %>ui/**/*.css',
                    '<%= stylesDir %>blocks/**/*.css',
                    '<%= stylesDir %>pages/**/*.css',
                    '<%= vendorDir %>styles/*.css',
                    //'<%= stylesDir %>layout/*.css',
                    //'<%= stylesDir %>fonts/*.css',
                    '<%= stylesDir %>*.css',
                    '<%= vendorDir %>styles/*.css'
                ],
                dest: '<%= publicDir %>includes/styles.html'
            },
            buildScripts: {
                options: {
                    scriptTemplate: '    <script type="text/javascript" src="{{path}}?v=<%= version %>"></script>',
                    openTag: '<!-- start script template tags -->',
                    closeTag: '<!-- end script template tags -->'
                },
                src: [
                    '<%= prodBuildDir %>scripts/main.min.js',
                    '<%= prodBuildDir %>scripts/vendor/jquery-1.7.min.js',
                    '<%= prodBuildDir %>scripts/vendor/jquery-ui-1.10.3.min.js',
                    //'<%= prodBuildDir %>scripts/vendor/jquery.bxslider.min.js',
                    //'<%= prodBuildDir %>scripts/vendor/parallax.min.js',
                    '<%= prodBuildDir %>scripts/vendor/init.js'

                ],
                dest: '<%= prodBuildDir %>includes/scripts.html'
            },
            buildLinks: {
                options: {
                    linkTemplate: '    <link rel="stylesheet" type="text/css" href="{{path}}?v=<%= version %>" media="screen"/>',
                    openTag: '<!-- start css template tags -->',
                    closeTag: '<!-- end css template tags -->'
                },
                src: [
                    '<%= prodBuildDir %>styles/main.min.css',
                    '<%= prodBuildDir %>styles/vendor/*.css'
                ],
                dest: '<%= prodBuildDir %>includes/styles.html'
            }
        },
        clean:{
            dev: {
                options: { force: true },
                src: ['<%= publicDir %>includes']
            },
            prod: {
                options: { force: true },
                src: ['<%= prodBuildDir %>includes', '<%= prodBuildDir %>scripts/main.js', '<%= prodBuildDir %>styles/main.css']
            }
        },
        concat:{
            js:{
                src: [
                    //'<%= scriptsDir %>constants/constantsDefine.js',
                    //'<%= scriptsDir %>constants/**/*.js',
                    '<%= scriptsDir %>gt/GT.js',
                    '<%= scriptsDir %>gt/helpers/**/*.js',
                    //'<%= scriptsDir %>gt/UIComponents/**/*.js',
                    //'<%= scriptsDir %>gt/masking/masking.js',
                    //'<%= scriptsDir %>gt/masking/masks/decimal.js',
                    //'<%= scriptsDir %>gt/masking/masks/**/*.js',
                    //'<%= scriptsDir %>gt/masking/**/*.js',
                    //'<%= scriptsDir %>gt/validation/validation.js',
                    //'<%= scriptsDir %>gt/validation/helpers/**/*.js',
                    //'<%= scriptsDir %>gt/validation/microvalidators/**/*.js',
                    //'<%= scriptsDir %>gt/validation/validators/dependency/dependency.js',
                    //'<%= scriptsDir %>gt/validation/validators/**/*.js',
                    //'<%= scriptsDir %>gt/validation/**/*.js',
                    '<%= scriptsDir %>libs/awareness/**/*.js',
                    '<%= scriptsDir %>libs/faith/**/*.js',
                    '<%= scriptsDir %>libs/cnCt/**/*.js',
                    '<%= scriptsDir %>riskSim/RS.js',
                    '<%= scriptsDir %>riskSim/modules/**/*.js',
                    '<%= scriptsDir %>riskSim/elements/**/*.js',
                    '<%= scriptsDir %>riskSim/**/*.js',
                    '<%= scriptsDir %>init.js'
                ],
                dest: '<%= prodBuildDir %>scripts/main.js'
            },
            css: {
                src: [
                    //'!<%= stylesDir %>_services/**/*.css',
                    '<%= stylesDir %>*.css',
                    '<%= stylesDir %>default.css',
                    //'<%= stylesDir %>ui/default/*.css',
                    '<%= stylesDir %>ui/**/*.css',
                    '<%= stylesDir %>blocks/**/*.css',
                    '<%= stylesDir %>layout/*.css',
                    '<%= stylesDir %>pages/**/*.css'
                ],
                dest: '<%= prodBuildDir %>styles/main.css'
            }

        },
        replace:{
            cssFixURLs: {
                src: '<%= prodBuildDir %>styles/main.css',
                dest: '<%= prodBuildDir %>styles/main.css',
                replacements: [
                    {
                        from: /(\.\.\/){2,}/g,
                        to: '../'
                    }
                ]
            }
        },
        cssmin:{
            all: {
                files: {
                    '<%= prodBuildDir %>styles/main.min.css': ['<%= prodBuildDir %>styles/main.css']
                }
            }
        },
        uglify:{
            all: {
                files: {
                    '<%= prodBuildDir %>scripts/main.min.js': ['<%= prodBuildDir %>scripts/main.js']
                }
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-includes');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-script-link-tags');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');


    grunt.registerTask('default',
        [
            'copy:htmlDevSource',
            'tags:buildDevScripts',
            'tags:buildDevLinks',
            'includes:dev',
            'clean:dev'
        ]);
    grunt.registerTask('prod',
        [
            'concat',
            'replace:cssFixURLs',
            'cssmin',
            'uglify',
            'copy:images',
            'copy:data',
            //'copy:fonts',
            'copy:htmlSource',
            'copy:vendorScripts',
            'copy:vendorStyles',
            'tags:buildScripts',
            'tags:buildLinks',
            'includes:prod',
            'clean:prod'
        ]);
    grunt.registerTask('dev',
        [
            'concat',
            'replace:cssFixURLs'
        ]);
};