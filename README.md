Postflop Statistics
===================
Postflop Statistics is a poker tool that helps us to calculate frequencies impact on the postflop in poker texas holdem. It is a simple tool to have a much more solid idea of how they impact ranges according to a given table and can help us improve our postflop game and reading ranges as well as understanding the impact frequency of rivals.


## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.


DEMO
====
[POSTFLOP STATISTICS](http://santiagocuenca.com/postflop-statistics/#/postflop-statistics)

DEPLOY
 - grunt build
 - zip -r poker-postflop-statistics.zip dist && scp poker-postflop-statistics.zip ubuntu@<ip>:/home/ubuntu/proyectos && rm poker-postflop-statistics.zip
AWS
 - rm -rf poker-postflop-statistics && unzip poker-postflop-statistics.zip && mv dist poker-postflop-statistics && sudo chmod 775 poker-postflop-statistics && rm poker-postflop-statistics.zip
