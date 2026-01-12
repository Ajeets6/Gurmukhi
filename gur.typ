#set text(lang: "pa",script: "guru",dir: ltr)
#set page(margin: 0.4cm,paper: "a5")

#set document(
  title: [Gurmukhi ਗੁਰਮੁਖਿ],
)
#align(center)[
  #title()
]



#show heading: set text(size: 8pt, weight: "regular")

#v(0em)
= Grouped by similar characters:
#v(0.4em)




#let letter(native, latin, name) = table.cell(
  inset: 8pt,
  align: center,
  stroke: 0.8pt + gray,

  [
    #text(size: 18pt, weight: "medium")[#native]
    #linebreak()
    #text(size: 11pt, fill: gray.darken(50%))[#latin]
    #linebreak()
    #text(size: 10pt, fill: luma(1), style: "italic")[#name]
  ]
)
#set align(center)
#let empty = table.cell(stroke: none, [])
#grid(
  columns: (1fr, 1fr),
  gutter: 0.5cm,

table(
  columns: 4,
  gutter: 0.5pt,
  letter("ਦ","D","dadda"),
  letter("ਢ","Dh","dhadda"),
  letter("ਫ","Ph","phappa"),
  empty,

  letter("ਹ","H","haha"),
  letter("ਰ","R","rara"),
  letter("ਗ","G","gagga"),
  letter("ਚ","Ch","chacha"),

  letter("ਮ","M","mamma"),
  letter("ਸ","S","sassa"),
  letter("ਬ","B","babba"),
  letter("ੳ","O","oora"),

  letter("ਪ","P","pappa"),
  letter("ਧ","Dh","dhadda"),
  letter("ਖ","Kh","khakha"),
  letter("ਥ","Th","thatha"),

  letter("ਟ","T","tainkaa"),
  letter("ਣ","Nh","nanna"),
  letter("ਨ","N","nanna"),
  letter("ਠ","Th","thaththa"),

  letter("ਵ","V","vava"),
  letter("ਞ","Ny","nyanna"),
  letter("ੲ","E","eerhee"),
  letter("ਝ","Jh","jhajja"),

  letter("ਡ","D","dadda"),
  letter("ਭ","Bh","bhabha"),
  letter("ਤ","T","tatta"),
  letter("ੜ","Rd","rarra"),

  letter("ਅ","A","aira"),
  letter("ਘ","Gh","ghagga"),
  letter("ਯ","Y","yaya"),
  letter("ਜ","J","jajja"),

  letter("ਲ","L","lalla"),
  letter("ਕ","K","kakka"),
  letter("ਛ","Chh","chhachha"),
  letter("ਙ","ṅ","nganga")
),
table(
  columns: 5,
  gutter: 1pt,
  letter("ਸ਼","Sh","shashaa"),
  letter("ਖ਼","Kh","khakha"),
  letter("ਗ਼","G","gagaa"),
  letter("ਜ਼","Z","zazaa"),
  letter("ਲ਼","Lh","lallaa"),


  letter("ਾ","aa","kannā"),
  letter("ਿ","i","sihārī"),
  letter("ੀ","ee","bihārī"),
  letter("ੁ","u","auṅkaṛ"),
  letter("ੂ","oo","dulankar"),
  letter("ੇ","e","lāvā"),
  letter("ੈ","ai","dulāvā"),
  letter("ੋ","o","hōṛā"),
  letter("ੌ","au","kanauṛā"),
  empty,

  letter("ਂ","n","bindee"),
  letter("ੰ","nn","tippee"),
  letter("ੱ","","adhak"),
  empty,
  empty,

  letter("੍ਹ","h","paeree-haha"),
  letter("੍ਰ","r","paeree-rara"),
  letter("੍ਵ","v","paeree-wawa"),
  empty,
  empty,


)
)

