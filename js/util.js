
function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Converts the number of neighboring mines to a specific color (Minesweeper's original colors :)
function getNumColor(num) {
  var color;
  switch (num) {
      case 1:
          color = '#1435ef';
          break;
      case 2:
          color = '#528742';
          break;
      case 3:
          color = '#eb3223';
          break;
      case 4:
          color = '#17227f';
          break;
      case 5:
          color = '#72160e';
          break;
      case 6:
          color = '#357a7b';
          break;
      case 7:
          color = '#030303';
          break;
      case 8:
          color = '#7f7f7f';
          break;
      case 0:
          color = '#AARRGGBB';
          break;
      default: 
          color = '#AARRGGBB';
          break;
  }
  // 1 '#1435ef'
  // 2 '#528742'
  // 3 '#eb3223'
  // 4 '#17227f'
  // 5 '#72160e'
  // 6 '#357a7b'
  // 7 '#030303'
  // 8 '#7f7f7f'
  return color;
}



// MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMmmddyyyyyyydmmmmNmmmMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
// MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNmdddddmmmmdddddddddmmmmdddhddmmNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
// MMMMMMMMMMMMMMMMMMMMMMMMMMMMNmhhhddddmmdddddhhhyyyyyhhhhddddmmmmddhdmMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
// MMMMMMMMMMMMMMMMMMMMMMMMMMNy+ydddddhhdddhyyysooooooossssyyhhhhddddmdyshNMMMMMMMMMMMMMMMMMMMMMMMMMMMM
// MMMMMMMMMMMMMMMMMMMMMMMMdyoyhhyyyyhyhyyysoooo+++++++++ooooosyyhyyyhhdhyohMMMMMMMMMMMMMMMMMMMMMMMMMMM
// MMMMMMMMMMMMMMMMMMMMMMd++yhysysssssssooo+++/////////////+++oooosssssshhyosNMMMMMMMMMMMMMMMMMMMMMMMMM
// MMMMMMMMMMMMMMMMMMMMNo/yysoooooo+++++++///////://:/:://///////+++oooooosys/omMMMMMMMMMMMMMMMMMMMMMMM
// MMMMMMMMMMMMMMMMMMMh/ohs+++++++++///////:::::::::::::::://///////+++++++oyy+/dMMMMMMMMMMMMMMMMMMMMMM
// MMMMMMMMMMMMMMMMMMy/oho/+++++++//////::::::::::::::::::::::/:://///+++++++yyo:yMMMMMMMMMMMMMMMMMMMMM
// MMMMMMMMMMMMMMMMMM+yyo++++++++////////::::::::::::::::::::::::://////++++++syo/hMMMMMMMMMMMMMMMMMMMM
// MMMMMMMMMMMMMMMMNyyyo++++++++//////::::::::::::::-:::::::::::::://///+++++++shs+mMMMMMMMMMMMMMMMMMMM
// MMMMMMMMMMMMMMMMyyys++++++++/////::::::::::::-----------::::::::::///+++++++oshsoNMMMMMMMMMMMMMMMMMM
// MMMMMMMMMMMMMMMdsyoo++++++++/////:::::::::::-------------:::::::::////+++++++oshooNMMMMMMMMMMMMMMMMM
// MMMMMMMMMMMMMMmoyso+++++++++////::::-------------------------::::://///+++++++oyy//dMMMMMMMMMMMMMMMM
// MMMMMMMMMMMMMMsosoo+++++++//////:::::---:::------------------::::://////+++++++sy:.:dMMMMMMMMMMMMMMM
// MMMMMMMMMMMMMd+oso++++++++//////:::::::-:::----------------::::::////////++++++oy/`./NMMMMMMMMMMMMMM
// MMMMMMMMMMMMMh:osoo+++++++///////:::::::::::------------:::::::::////////++++++os/``+MMMMMMMMMMMMMMM
// MMMMMMMMMMMMMh-oooo+++++++///////::::::::---------------::::::::://///////+++++oso `oMMMMMMMMMMMMMMM
// MMMMMMMMMMMMMh-oooo++++++////////:::::::------------------::-::::////////++++o++ss` .NMMMMMMMMMMMMMM
// MMMMMMMMMMMMMd/oooo++++++////////::::------------------------::::////////++++++ooo` `NMMMMMMMMMMMMMM
// MMMMMMMMMMMMMd/soooo+++++////++/////:::::-----------------::::///++++++//+++++++os-`-NMMMMMMMMMMMMMM
// MMMMMMMMMMMMMNosso++++++++/+ooooooooo+//::::-----------::/+oosyysyyssssooo++++++os/:/NMMMMMMMMMMMMMM
// MMMMMMMMMNNMMh:sso++++++ooosyyyhddddddhyso+/:::::::::://osshddddddddhyysyyso++++os+::/odNMMMMMMMMMMM
// MMMMMMMNs::oyy+yso+++++oosssyhhhhhddhdhhhyso++/::::://+osyyhyyyyyyyysoooooso++++oy+::::::hMMMMMMMMMM
// MMMMMMMs:/++oooyyo+++++oo++++ossyyyysyyyyyyso+//:::://+ssyyyssyysyysyso+++++++++oys++oo/:-NMMMMMMMMM
// MMMMMMMN+os++oosso++++++///+yyhysdmmdysssssyso+/:::::+osyyssyddmddsyhyyo+++++++++so++os+:sMMMMMMMMMM
// MMMMMMMM++so+++os++/+//+++oyhho:odhmhh:/ososyo+/::::/+osyso/:hhmdd+:odhsoo++/++++o+/++++:yMMMMMMMMMM
// MMMMMMMMh+oo+//+o+//////++oosso//oyyy+/+ooosso+/:::::/+ssss+//sss+/+osso+++////++++/+++/-yMMMMMMMMMM
// MMMMMMMMd:+o++++o+////////+++o++++++++oooooo+++//::::/+++ossooo+o++++o++///////++++/+++:+MMMMMMMMMMM
// MMMMMMMMm//oo++o++//////////+++++++++++++++++////::::/+///+++++o+++++++/////////+++/++/:mMMMMMMMMMMM
// MMMMMMMMMN+/o+oo++/////::://///////////////++////:::://++///////////:::::/+////++++//+:oMMMMMMMMMMMM
// MMMMMMMMMMM/+osso+/////:::::::///////:::://++++///:::/++++//::::::::::::::/://+++ooo+/:MMMMMMMMMMMMM
// MMMMMMMMMMMs+o+oo+++///::::::::::::::::::/+++////::::////+//:::::::::::::::///+++oo++/hMMMMMMMMMMMMM
// MMMMMMMMMMMm/o+++++++////:::::::::::::::/++/////:::::::////+/::::::--:::::://+++oo+++.hMMMMMMMMMMMMM
// MMMMMMMMMMMm-/+++++++////:::::::::---::/++//////::---::////++//::---:::::////+++o+++//NMMMMMMMMMMMMM
// MMMMMMMMMMMm.-///++++/////:::::::::::://+o+oss+//:::-:/+oo++++/:::::::::////+++oo+++/sMMMMMMMMMMMMMM
// MMMMMMMMMMMMd:--::++++/////::::::::::////++oosoo+////+ooo++/////:://:::///+++++o+::/dNMMMMMMMMMMMMMM
// MMMMMMMMMMMMMNmh+:/+++//////::::::///////++++++ooo+++o+++++//+/////::////+++++oo//dNMMMMMMMMMMMMMMMM
// MMMMMMMMMMMMMMMMMh:++++///////:://+///+++++++////+++////+++++///++/////++++++oo+/NMMMMMMMMMMMMMMMMMM
// MMMMMMMMMMMMMMMMMM+/+++/++//////++////+++/+//////////////++++//++++////+++++++o/oMMMMMMMMMMMMMMMMMMM
// MMMMMMMMMMMMMMMMMMo/+++++///////+++++ooo+oo++++++/++++++++++++++o++///+++++++oo+NMMMMMMMMMMMMMMMMMMM
// MMMMMMMMMMMMMMMMMMm/:++///+///////+++ooossssssoopukiooooossooooo++////++++++ososmMMMMMMMMMMMMMMMMMMM
// MMMMMMMMMMMMMMMMMMMmo/++/++++///////++/+++++++///////////+++++++////+++++++oodmhsmMMMMMMMMMMMMMMMMMM
// MMMMMMMMMMMMMMMMMMMMNo/+++++++////+//////++++//////////++++/++++///+++++++ossmMNdymMMMMMMMMMMMMMMMMM
// MMMMMMMMMMMMMMMMMMMMMNs/+o+++++//+++///////+ooo+o+ooooo++++///+++++++oooosyssNMNNmyhNMMMMMMMMMMMMMMM
// MMMMMMMMMMMMMMMMMMMMMMMd//oo++++++++++////:///+ooo++++////////++++++ooosyyssyMMNNmmhsdMMMMMMMMMMMMMM
// MMMMMMMMMMMMMMMMMMMMMMMMd/ssooo++++++++///////+++++++//////++++oooooosyyyssydMMNNNNNmhhNMMMMMMMMMMMM
// MMMMMMMMMMMMMMMMMMMMMMNddNMdsssoooooo++++//////////////////+++ooooosyyysssshNMNNNNNNmmmdMMMMMMMMMMMM
// MMMMMMMMMMMMMMMMMMMMddNNNMMNyssyyssooo++++/////://:/:://///+oossssyyysooosymMNNNNNNNNNMMMMMMMMMMMMMM
// MMMMMMMMMMMMMMMMMMmdNMMMMMMMmsssyyyysoo+++///////////////++osyyyyyssoooosydNNNNNNNNNMMMMMMMMMMMMMMMM
// MMMMMMMMMMMMMMMMMMNMMMMMMMMMNhsssssyyysoo++++++++++//++++oosyyhysoooooossdNNNNNNNNMMMMMMMMMMMMMMMMMM
// MMMMMMMMMMMMMMMMMMMMMMMMMMMMMmysssssssyyssoooooooooooooosyyyyssooooooooshNNNNNNMMMMMMMMMMMMMMMMMMMMM
// MMMMMMMMMMMMMMMMMMMMMMMMMMMMMNhssoossssssyyyyyyyyyyyyyyssssssoo+++++oosyNNNNMMMMMMMMMMMMMMMMMMMMMMMM
// MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMmssoooooossssssssssoooooooooo+++++++++oohNMMMMMMMMMMMMMMMMMMMMMMMMMMMM