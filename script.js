let doges = new Audio("/img/logo/who_let_the_dogs_out.mp3");
let partyFlag = false;

$(document).ready(function () {

  // Click-to-scroll for animated arrow
  $('#about-us').click(function () {
      $('html,body').animate({
          scrollTop: $(".meet-us--tiles").offset().top},
          'slow');
  });

  // Party Mode Button
  $('#party-mode').click((event) => {
    let target = $(event.target);
    if (partyFlag) {
      partyModeOff(target);
    } else {
      partyModeOn(target);
    }
  });
});


function partyModeOn(target) {
  target.attr("disabled", true);
  partyFlag = true;
  loadPage(partyFlag);
  doges.play();
  target.text('DISABLE PARTY MODE');
  target.attr("disabled", false);
}

function partyModeOff(target) {
  target.attr("disabled", true);
  partyFlag = false;
  doges.pause();
  loadPage(partyFlag);
  target.text('ENABLE PARTY MODE');
  target.attr("disabled", false);
}

function checkWhitespace(name) {
  var counter = 0;
  var name = name.split('');
  name.forEach(function(char){
    if (char === " ") {
    counter = counter + 1;
    }
  });
  return counter;
}
  // XHR to load class info from json file
  function getClassFromJson() {
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: "classinfo.json",
      }).done(function(response) {
        resolve(response);
      }).fail(function(error) {
        reject(error);
      });
    });
  }

  // Load the class info, load the DOM with cards
  function loadPage(partyFlag) {
    getClassFromJson()
    .then(function (response) {
      var propertyName = Object.keys(response)[0];
      var infoArr = response[propertyName];
      var cardString = generateCards(infoArr, partyFlag);

      attachCardsToDOM(cardString);
      // Auto-fix the bio div size
      shrinkPersonBioDiv();
      // Also resize them if the size of the browser changes
      window.addEventListener('resize', shrinkPersonBioDiv, true);
    });
  }

  function shrinkPersonBioDiv() {
    // This will literally wait until the first image is loaded.
    // Guys, this is crazy.
    // Javascript 😍
    var img = new Image();
    var firstImage = document.querySelector('.person-image');

    img.onload = function(){
      var allPersonBios = document.querySelectorAll('.person-bio');
      var firstImage = document.querySelector('.person-image');
      var imageWidth = firstImage.offsetWidth;
      var marginValue = firstImage.offsetLeft;
      allPersonBios.forEach(function (bio) {
        bio.style.width = imageWidth + 'px';
        bio.style.margin = '0 ' + marginValue + 'px';
      });
    };

    img.src = firstImage.src;
  }

  function generateCards(peopleArr, partyFlag) {
    return peopleArr.reduce(function(domString, person, i) {
      let pictureChoice = '';
      if (partyFlag) {
        pictureChoice = person.personalityPic;
      } else {
        pictureChoice = person.professionalPic;
      }
      domString += "<div class='col-sm-6 col-md-4 col-lg-3 person-tile'>" +
                   "<div class='image-container'>" +
                      "<img class='person-image' src='" + pictureChoice +
                        "' alt='" + person.name + "''>" +
                      "<div class='person-bio'><span>" + person.aboutMe + "</span></div>" +
                   "</div>" +
                   "<h3>";
      if (person.name.includes("(")) {
        domString += person.name.split(") ")[0] + ")<br/>" + person.name.split(") ")[1];
      } 

      else if (checkWhitespace(person.name) > 2) {
        domString += person.name.split(" ")[0] + " " + person.name.split(" ")[1] + "<br/>" + person.name.split(" ")[2] + " " + person.name.split(" ")[3];
      }

      else {
        domString += person.name.split(" ")[0] + "<br/>" + person.name.split(" ")[1];
      }
      domString += "</h3>" +
                   "<hr>" +
                   "<div class='tile--icons'>" +
                       "<a href='" + person.githubLink + "' target='_blank'>" +
                           "<img src='img/logo/Github.svg' alt='Github'/>" +
                       "</a>" +
                       "<a href='" + person.linkedInLink + "' target='_blank'>" +
                           "<img src='img/icon/linkedin.svg' alt='Linkedin'/>" +
                       "</a>" +
                       "<a href='" + person.portfolioLink + "' target='_blank'>" +
                           "<img src='img/icon/globe.svg' alt='Personal Website'/>" +
                       "</a>" +
                     "</div>" +
                   "</div>";

      return domString;
    }, '');
  }

  function attachCardsToDOM(cardString) {
    meetUs = document.getElementById('meet-us--row');
    meetUs.innerHTML = "";
    meetUs.innerHTML = cardString;
  }

  loadPage(false);

var guy = [
  "                                               `                  `",
  "                                                   `              `   `",
  "                                              ``.```    . ``      `  `. `",
  "                                              ``````` ` ` `   ` . .  ``",
  "                                              ```. `.```.   ... ``..```` `",
  "                                      `  `   `` .`.`` ..`.``....`.`.`....` .",
  "                                      ` ..`  `. ..``.`....``....```.....``` `",
  "                                `    `.  ``.``.`.````.`.```...`.....``...````",
  "                                    ` .  ...`,..`..```...``.````. `.```.`` .`",
  "                                 .`  .````....`.````````````````````.````` ``",
  "                                . .` ``.`.`.``````````````````.``````````  `   `",
  "                               `.`` .```..`.````````````````````````````` `````",
  "                                `.` ...```.`````````````````````````````.``.`...",
  "                             ` ``..``````````````````````````````````````.`.``.`   `",
  "                              ``````.`````````````````````````````````` ``..```  `.",
  "                               ``..``````````````` .````````````````````.`..``` . `",
  "                         .`  `` .`.``.```.``````````.```````````````````.``...`.  `",
  "                          .``` .`.```````````````````````````````````````````.`. ``",
  "                         ` ```` ....````````````..````` ```````````````````````.`.  `",
  "                         ` ````..``````` ```````.`````` ````````` `````````..`..`.",
  "                        . ` `.  ``.```````````````````` ```.````` `````.```.``..`. .",
  "                         ` ``` `````` ``````````.``````````.````````.``.```.``..`.```",
  "                        `` ``.   ````````` ``````````````..`````````.```. `````.`..``",
  "                       `````.` ` ``````````.` ` ````````````````.` `.``.`````````. `.",
  "                       `   `.`  `````` ````.```````````````.`.```````````````````.``.`",
  "                     ```   `.````````` ``` ``````````````````````````````````````...``",
  "                      ```    `.`````` `````````.``````.````.``````````````````````.``.",
  "                      `.` `.`  ````````````.````````.`````````````````````` ````````.`",
  "                       ` ` ```   ``` ```  `.``````````.```.`..``..``.``````  `````.`..",
  "                        ``````. `````` `` ``````.``.``.`````..``````.````.`` ``````... `",
  "                        ```````..```````` ````.`.```````````..````````.```````````..``",
  "                        `.````` ` ````` `  `````.``.``````....``````.`.`..````````.```..",
  "                        `````.````  ``` ``  ````````.````.``..`.` ````.`.``.`````````.``",
  "                     ` `` `.`.`` `     ` ` ```.`````````````.``.``.`.`...``....``````.` `",
  "                       ``..```````` ` `. ``````...`````````````.`.`.`.....,,....````..`",
  "                      `.`,``````.```   `` ` .```..`````````.```````..,,...,,,,...```````",
  "                      `.`.`` ```````   ``````.`````````````````..`........,,,,...`````.````",
  "                       `.``.```````` ` ``.`..``.`....````````............,,,,,,..`````.",
  "                     ` ...`````````` `````.`.......`````````..`..`.......,,,,,,.`..`.`. `",
  "                      ``..`````````````.`..........`````````````........,.,,,,,........`",
  "                      ``````````````````.............````````````........,,,,,,.`.......",
  "                      .````. ``` `` `.....``.......`.````````````........,,,,,,,.....`.`",
  "                      `` `` ```` `````.............``````````````.......,,,,,,:,.......``",
  "                       ``.``  ``` ````................``````````.......,,,,,:,,,...`...`",
  "                     ` .`````  ``.````................`````````........,,.,,:,::,......`",
  "                     ``````````` `````.................```````.........,,,,,:,,:..`..,.`",
  "                      ```.``````` ```....................```..........,,,,,,,,::,.`.....`",
  "                      . `.``````..````.......,............``.........,,,,,,,,,,:,...,...",
  "                      `.  ``````.`.````.,.............................,,,,,,,:,:,....,..`",
  "                       `. `````..`.````.,...,........................,,,,,,,,,,::,...,..",
  "                      ``.``````....```..,,.,,,,......................,,,,,,,,,:::,,.,,.`",
  "                      `````````.``.```...,.,,,,,....................,,,,,,,,,,,::,,,.,,`",
  "                       `.``.`.``..``.....,.,..,,,....................,,,,,,,,,,:::,.,.,,",
  "                       .```.`..``.```.``.,.,,.,,,,,..................,,,,,,,,,,:::,,.,,`",
  "                      ` .```.........``..,,,,,,,.....................,,,,,,,,,,:::,,..,`",
  "                      `` `.````,`,`.```..,,,..,,,.......................,,,,,,,,:::,..,",
  "                       `````````.`..``...,,,.,,,........................,.,,,,,,:::;,.,.",
  "                       .`....````,..`.`.,,,,,,,,,........................,,,,,,::::',.,.",
  "                       ```.... ``.`..`.`,,,,,,,,.,.......................,,,,,,::::;:,,.",
  "                       ```.,..` ```.. `..,,,,,,,,.,......................,,,,,,,:::;;,:;.",
  "                       ``...,,,..``.`.`..,,,,,,,,.......................,,,,,,,:::::;,.;`",
  "                        ````,,.,,..`.`...,,,,,,,,..........`..........,,,,,,,,,,::::;,.:`",
  "                         `.``...`..```.`.,,,,,,,,....................,,,,,,,,,::::::;:,;.",
  "                         `.``.`.,``...`.,,,,,,,,,...................,,,,,,::;;;';;::::,;,",
  "                         ......`````...,:,,,,,,,,,..............,,,,,,:::'''''''''::::,:,",
  "                         `.....,.......,,,,,,,,,.,,......,,...,,,,,,::;;'++++++''';:::,,,",
  "                        `..````.......,:,,,,,,,,..,..,...,,,,,,,,,,,:;'++##++''';;;:::,,.",
  "                          ..``..`..,,:,,,,,,,,,,...,,,..,,:,,,,,,,,,:;'+++'';;;;::;::::.`",
  "                         `..,.`..,..,,:,,,,,,,,,,,.,,,::::::::,::,,:;'''';;;;;;;:::::::,`",
  "                         `.,,..,,,...:,,,,,,,,:,::::;;''';;::::,::::;;'''+####++;::::::,`",
  "                         ``.,:,,,.`..,,,,,,,,,::;;;''+++''';;::,,,,:;''++#@@@####;:::::,.`",
  "                          .,:;,,,,.:.:,,,,,,,:;''''++++++';;;::,,,:;'+'''@'@@#+++';::::,,",
  "                          ..';',,.:.,,,,,,,,:;;'''+''+';;;;;;;:,,,:;'+'###+';'';;'::,:::.",
  "                           `:::;:,,...,,,,,,;;'''';;:;;;;;;;;;:,..,;+##';;:;;;::::::,,::`",
  "                           ,::,,::....,.,,,,;;;;;;:::'#++;;;;;:...,;++';;:::::::;:,:,::;`",
  "                           ,;;:,,.....,,.,,:;;;;:;;+@@@'+'';;':.`.,:''';:::::::;:,,,,::;",
  "                           .;;':::....,,,,,:;;;;;+##@@#+###'';:.`..,;;;;;;;;;;;;:,,:,,:;",
  "                           `;;+':,....,,..,:;;;;###@+#+'';;:;::.`..,,;:::;;;;;:.,,:,:::;`",
  "                            ;;'';,,....,,,,,:;;+++';::;;::;;;,:....,,,::,,,:,,...,,::::;,",
  "                            :;;'',..,...,,,,:;;;,:,,:,::;;;::,,......,:,,,.......,,,::,;:",
  "                            :';;':....,,,,::::;:,,,,,,:;;;:::,.....,.,,,,........,,,::,;:",
  "                            .;:;;:.,,,,,,,,:,.,,:,,:::;;::,:,,......,,,,,........,,,,:,;:",
  "                             :;;;;,..,,,,,,...,.,:::;;;;:,,,,...``..,..,,........,,,,:,;:",
  "                             :;;::,,,,,,,,,..,.,,::;;::,.,,,,...```..,,:,,........,,,,,:;",
  "                             .:::;:.:,,,,,,,,.,,............,..`.``.,,:;:,,.......,,,,,:;",
  "                              ,:::;:,:,,,,,,,.....``.`.........````..,;'';,......,,,,,,,:",
  "                              :;,:;::,,:,,,,......````.`....,,,.```..,;;'',,,,,,.,,,,,,,'",
  "                              ,:.:;:::,,,,,,.....````````...,:,,````.,;,,#':,,,,,,,,,,,,.,",
  "                               ,,:;:;:::,,,,,....`````````.,:::,.```.,,.,:+;:,,,,,,,,,,,.,",
  "                               ,:,,::::,:,,,.....````````.,:,,:,..``..,..,'';:,,,,:::,,:,`",
  "                               ,,:,:::::,,,,......``````..::...,..``..,,,,'';;,,:,:::,::,`",
  "                               ,.:,,::::,,,,.............,;:......```.,,,,''';:,::::::::,,",
  "                                ,.,,::::,,,,............,:;:......``..,,,,''';::::::;::::'",
  "                                ,..,::::,,,,,..........,:;::.........,,.:#''';;:::;;;;;;;`",
  "                                ,.,,:::,,,,,..........,:;;::,,,,,...,,:;##';'+;:::;;;;;;:",
  "                                `..,::::,,,,,,,.......::;;:::::::,,,,:;###':;+':::;;;;;;:",
  "                                 ..,::::,,,,,,,,,....,:;';::''';:::::;'##+;';'+;::;;;;;;:",
  "                                 :,,:::,,:,,,,,,,,...,:;;:::;'++';;;;;##+#''+++;;;;;;;;;,",
  "                                  ,,:::,,,:,,,,,,,,,,:;';;:;;+##++'''###++++'++';;;;;;;;.",
  "                                 `.:::::,:,:,::,,,,,::;';;;;;'+#+##++###++''++++;:;;;';;`",
  "                                 . `,:::::::::::::,,::;'';;;;'++++#+'+#+++':'+++;::;;;;;",
  "                                 ,  '::::::::::::::::;'''';;;''+++##'++'+';;++++;::;;;;'",
  "                                 :  +:::::::::;::::::;'+';;';'+++++++++''''#+'++;:;;;;;'",
  "                                 .  +:;::::::;:::;::;'+++''';'''+'++';;'';@#++++::;;';;:",
  "                                  :.+;;;:::::::;;:::;'+++''':;;;'';;;'';,;@#++++;:';;;'`",
  "                                  ,::;;;::;:::::;:::;++++''';;;;;;''';;::@##+'++;:;';;'",
  "                                   ':;;;;;;:;:;;;:::;+++#@;,,:,,,,.:.,::@@#+';'+:;;;;;'",
  "                                   #@';;;;:::::::;:::'+#+#@;,,.,.,`:,,'#@#+';;'+;;;;;',",
  "                                   +#:;;;;;;::::;::::;++'##@@#+#::.,'#####+';;'+'';;;'",
  "                                   ;@,;;;;;;;::;;:::::++';+#####++######++';;;;+''';;'",
  "                                   #@;';;;;;;::::::,,:;+;::'+##++++#+'#+'';;;:;++';;;,",
  "                                  `##@+;;;;;;::::;::,,;+::::;;'++''+++'';;;;;;;++'';;#@+",
  "                                  .;@#:';;';;:::::::,,;+;::,:::;;;'';;::;:;;:;;++';''@@@@@@@:`",
  "                                  ,+@@,';;;;;;::::;:,,;+;,,,,::,.,::,,:;;::::;;++';;'@@@@@@####@#;,;,`",
  "                                  ,+#@+';;'';;;:::::::;+;:,::,::,,..,::;;::::;'++';;'@@@@@@@@@@#######@@@:`",
  "                                  ,+###,';;'';;::::::,:+::,,::,::,,,,::;::::::;++';;'#@@@@@@##@##@@@@######@:`",
  "                                  .+;##:';;'';;;::::::;+',,,:::,,,,,:::;,:::::'++';''@@@@@@@@###@#############@;  `",
  "                                  .'+#@#;;;;;;;;::::;::+':,,,,::,,,:,::,:,,:::'+#;;;'@@@@@@@@#####################@@",
  "                                  .':;@#,';;'';;:::;:::+'::,,,:::,,::,,...,,::'+#;;;'@@@@@@@@#######################@",
  "                                  `+@;+##'';;;;;:::::;;+'::.,,,,..,,,...,,,:::'+#';;'@#@@@@@#@#######################@",
  "                                  ;#@#'#@:';;;;;;;::::'+':,,,,,,....,....,,,::'+#';;'@#@@@@@#@########################+",
  "                                 ',+##+'@#:';;;;;:::::;++:,,,,,..,....,...,:,;'+++;;'@+#@@@@@@@########################'",
  "                                `#;+#+#++#++;;;;;::::,;#'',...,...,,,..,`.,,:;++#+;;'@##@@@@###@########################'",
  "                                ###:#'#+;@':+;;;;;::::;++':,.............,,,,;'###;;'@##@@@@@##@#########################'",
  "                               #### #'##+@@',';;;;:::::#+;:,,.......`....:,.:;+##+';'@#@@@@@@###@#########################+",
  "                              :####+:+@#+###+:;;;;;::,;+++;,,.,`,....`...,:,:'+#++;;+##+@@@@@##############################+",
  "                              ###### ##'###@##;;;;;:::'##+':,,...`....,,.,:,;;###+';#:@##@@@@###############################+",
  "                             +#######,#@###@@+#;;;;;:::+#+'::,..,,...,..,:::;'#+++';+:##+#@@@#################################",
  "                            .########.#@###@@#'@;;;;;;;+##+;::,.,,.,..,,.,:;;+#+##+'+#+@'#@@@##################################",
  "                            ########## @#@#@@##'@;;;;'++#++';;:,,,,,,,,,:,:'+##+#+''##,@;@@@@##################################.",
  "                           ############,@###@@#++#;;;;'####''';:,,,,.,.,,:;'++###'';#@,#'@@@@@##################################",
  "                          .###########'.#####@##+##;'+######++';;,,.,,.,.;;'+#++''';#@;+@@@@@###################################.",
  "                          @##########';;`#@##@@##'@#'+#####+##+';;,,,,,,.;+++++'''';#@@;+##@@####################################;",
  "                         ###########+;;;;;####@#''#@##########+#+':,.,:,,;++#+''''''+@@,#+#@@####################################@.",
  "                        +##########+;;;;;;#@###@+''##############;;:,.::::+#''''''''+##:#;#@@####################################@#",
  "                       :###########;;;;;;;;@###@@+'@@###+#+######'',,.:,;:++';'''';++@#+;:@@@@###################################@#,",
  "                       ###########;;;;;;;;;;##@#@#'###@@#+++###+++'::,,,'';''''''''++#++.:#@@#######################################",
  "                      +##########+;;;;;;;;;;:#@#@@++##@@@#@++####+';,,,,,;''''''''++'#;;@;@@########################################",
  "                     `########+##;;;;;;;;;;;';###@#+##@@@@@;+';'+++;:,.,,;'''''''+++'##;#'@#@####################################@##",
  "                    `###########+;;;;;;;;;;;;:'#@#@#+#@@@@@:#';;;;';:,,,:''''''''++''+#:####@####################################@##",
  "                   .############;;;;;;;;;;;;;;,+#@###+@@@@@;#+';''';;;:,:''+''+'+++'++@@'###@#######################################,",
  "                  `###########+';;;;;;;;;;;;;;;,'##@###@@@@#++'''''';,:,;'++++++++'''+#;;@##@@######################################@",
  "                  ##########++#;;;;;;;;'';;;;;;','#@@###@@@@'#+''''';:::++++++++++'+'+;:,@##@########################################,",
  "                 +############;;;;;;;;;''';;;;;;'.:#@###@@@@:#++''''';:+'####++++++'''#+.###@@######################################++",
  "                 #########@###;;;;;;;;;;''';;;;;'',,#@###@@@:#++++++++##########+++'';+':#@#########################################+'.",
  "                '##+######@@@#;;;;;;;;;;;''';;;;;';,`#####@@'##+++++###########+++''';+:;@##@########################################''",
  "                ####+#######@#';;;;;;';;;;''';;;;;'':`##+#@@#+#################+++'';;#'########################################@#####'",
  "               :##############'';;;;;;;';;'''';;;;''';`:#+##@;#################++''';;+'###############################################:",
  "               ###########+###;'';;;';+;::,;''';;;;''''.`@##@,@##@@@@@@#########++';;;;,@######################################@#######:",
  "              #########+#+##++;'';;';;;''';;;''';;;;'''';`.@+.@@#@@@@@@@#######++''';;',###############################################+.",
  "             `#########++####;;;'+';;'';:;';'##+';;;'''''';`.,@@@@@@@@@@######+++'';;;+;################################################.",
  "             ###########+++#';;;;'';;;#':+,';+#'+';;;''''''';.`#@###@@@@######+++';;;;'#################################@###############'.",
  "            ;#############'';;;;;;;;;'+++;:+;,+#'';;;;''''''''+:`:+@##########++''';;;,@################################################+.",
  "            #############;;;;;;;;;;;;:'#+++;',,:#''';;'''''''''''+':,:+#@#####++'''';;.@###############################################'+'`",
  "           #############;;;;;;;;;;;;;;;+#;+++';;;++';;;''''''''''''++++;,;@##++''''';;:@################################################''`",
  "          .##########+#;;;;;;;;;;;;;;;;;#;+'#+';'#'+';;;''''''''''''''++++'.'++''''';;'@################################################;'`,",
  "          ###########++;;;;;;;;;;;;;';;;'+'++';,;'#''';;;'''''''''''''''+++++::'''';';#@##################################@####@########''`;:",
  "         ;#########@##;;;;;;;;;;;;;;;';;'+#+###'::;'+';;;''''''''''''''''++'''+::'';;,@##################################@##############+''. `",
  "         #####@@###+#;;;;;;;;;;;;;;+:+++''#####++::''+';;;''''''''''''''''''''''':;;;.###################################@@##############'''.",
  "        '###@@######';;;;;;;;;;;;;;#+##+''######'+;'++'';;;;''''''''''''''''''''''':'.#@@################################@@##############'''+@.",
  "        ###@@#######;;;;;;;;;;;;;;;;+##+''#######+':''+';;;;'''''''''''''''''''''''+:,##@################################@@##############+''+;,",
  "       '#@@####@@@@@;;;;;;;;;;;;;;;+++''+++###+;;#++:;''';;;;;''''''''''''''''''''''+;#@@################################@@###############''';'",
  "       #@########@@@#;;;;;;;;;;;;;;'''''#++++#++@;+++;:+';;;;;''''''''''''''''''''''+'@@#################################@@################'#+#`",
  "      ,@@###########@+;;;;;;;;;;;;;;;;;++'+++;:#'#;'++;'+';;;;;;'''''''''''''''''''''##@#################################@@#################++#:",
  "      #@#############+';;;;;;;;;;;;::::;+'+++;,#+#'++';''';;;;;;;''''''''''''''''''+;##@#################################@@##################'''",
  "      @#############;;;';;;;;;;;;;;:::;+##'+';;+#@+@+#:;''';;;;''''''''';''''''''''':##@##################################@###################''",
  "     +##############;;;;';;;;;;;;;;:::,'###'+;''++@#+##;''';;;;''''''''';;''''''''''.##@##################################@#################@#+'.",
  "     @##############;;;;;';;;;;;;;;:,::;###++;':'+';++##;''';;;''''';;''';';''''''''`##@##################################@################@###';",
  "    ;##############+;;;;;;;;;;;;;;;::,,;+####'',''+##+#';;'';;;;''''';''';;;''''''''`##@##################################@#############@##@####'",
  "    @#############++;;;;;;'';;;;;;;:,,,:'##+#'+''''+#+#+;;;+';;;''''';;'';;;''''''''.##@@#################################@###############@#####+,",
  "    ###############';;;;;;;';;;;;;;:,:,,;++'###+:'''#;###;;'+;;;;;'''';;;;;;'''''''',#####################################@@##@##########@@######'",
  "   :##############+;;;;;;;;;';;;;;;:,,,::+#@####;'''';##+;;'+';;;'''''';;;;;'''''''''###@##################################@##@##########@########",
  "   @###############;;;;;;;;;;';;;;;;;::,,;+###'#+,'';'##+;;;'+;;;;;'''''';;;''''''';+###@##################################@##@#########@@########:",
  "   ################;;;;;;;;;;;;;;;;;#;:,,:+##+@##;'+:''#;';;''';;;''''''''''''''''',####@##################################@##@########@@##########",
  "  `###############+;;;;;;;;;;;';;;;;;;':,,;+##+;##';+'',#;;;;'+;;;;''''''''''''''''.####@##################################@##@########@###########",
  "  ,#############+#+;;;;;;;;;;;;';;;;'#:;,,:;##;####+'+''++:;;''';;;;;'''''''''''''' #######################################@##@#######@@###########,",
  "  ###############';;;;;;;;;;;;;;';;;;'#'';;#':'#;##+++'',+;;;;'+;;;;;''''''''''''''`#######################################@##@#######@############'",
  "  @##########@;;;;;;;;;;;;;;;;;;;';;;''+':::'+#:@###++;+;'';;;''';;';'''''''''''''':#####@#################################@#@#######@############+;",
  "  ##########+;;;;;;;;;;;;;;;;;;;;';;;';,:',;#+#++'###+:'';;';;###;;;;';''''''''''';'#######################################@@@####################+',",
  " `########@'';;;;;;;;;;;;;;;;;;;;;';;:';;;:#+;';'@+@#++;+::;;;@##';;;;;''''''''''':######@#################################@#@######@##############'+",
  " ;#######@;;;;;;;;;;;;;;;;;;;;;;;;;';;:'''''##'#+,#'';+:'+':;;+##+;;;;;'''''''';''`######@#################################@@@@####################'+",
  " @#######;'';;;;;;;;;;';';;;;;;;;;;';;',;,+,;###;+;####+'+':;'+##+';;;''''''''''''`######@#################################@@@#####################';`",
  " #######;;'';;;;;;;;;;;'''';;;;;;;;'';',,'':'+###;@:##;;++::;+###++;;;''''''''''''.#######@################################@@@######################;:",
].join("\n");

function Sound(source,volume,loop)
{
    this.source=source;
    this.volume=volume;
    this.loop=loop;
    var son;
    this.son=son;
    this.finish=false;
    this.stop=function()
    {
        document.body.removeChild(this.son);
    };
    this.start=function()
    {
        if(this.finish)return false;
        this.son=document.createElement("embed");
        this.son.setAttribute("src",this.source);
        this.son.setAttribute("hidden","true");
        this.son.setAttribute("volume",this.volume);
        this.son.setAttribute("autostart","true");
        this.son.setAttribute("loop",this.loop);
        document.body.appendChild(this.son);
    };
}