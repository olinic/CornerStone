const verseCounts = require("./verseCounts.json");
const Promise = require("es6-promise");

const versions = {
   Afrikaans: [{ name: "Ou Vertaling", code: "aov" }],
   Albanian: [{ name: "Albanian", code: "albanian" }],
   Amharic: [
      { name: "Haile Selassie Amharic Bible", code: "hsab" },
      { name: "Amharic NT",                   code: "amharic" }
   ],
   Arabic: [{ name: "Smith and Van Dyke", code: "arabicsv" }],
   Aramaic: [{ name: "Peshitta NT", code: "peshitta" }],
   Armenian: [
      { name: "Eastern (Genesis Exodus Gospels)", code: "easternarmenian" },
      { name: "Western NT",                       code: "westernarmenian" }
   ],
   Basque: [{ name: "(Navarro Labourdin) NT", code: "basque" }],
   Breton: [{ name: "Gospels", code: "breton" }],
   Bulgarian: [{ name: "Bulgarian Bible (1940)", code: "bulgarian1940" }],
   Chamorro: [{ name: "(Psalms Gospels Acts)", code: "chamorro" }],
   Chinese: [
      { name: "NCV Traditional",   code: "cnt" },
      { name: "NCV Simplified",    code: "cns" },
      { name: "Union Simplified",  code: "cus" },
      { name: "Union Traditional", code: "cut" }
   ],
   Coptic: [
      { name: "Bohairic NT",   code: "bohairic" },
      { name: "New Testament", code: "coptic" },
      { name: "Sahidic NT",    code: "sahidic" }
   ],
   Croatian: [{ name: "Croatian", code: "croatia" }],
   Czech: [
      { name: "Czech BKR", code: "bkr" },
      { name: "Czech CEP", code: "cep" },
      { name: "Czech KMS", code: "kms" },
      { name: "Czech NKB", code: "nkb" }
   ],
   Danish: [{ name: "Danish", code: "danish" }],
   Dutch: [{ name: "Dutch Staten Vertaling", code: "statenvertaling" }],
   English: [
      { name: "King James Version",          code: "kjv" },
      { name: "KJV Easy Read",               code: "akjv" },
      { name: "American Standard Version",   code: "asv" },
      { name: "Basic English Bible",         code: "basicenglish" },
      { name: "Darby",                       code: "darby" },
      { name: "Young's Literal Translation", code: "ylt" },
      { name: "World English Bible",         code: "web" },
      { name: "Webster's Bible",             code: "wb" },
      { name: "Douay Rheims",                code: "douayrheims" },
      { name: "Weymouth NT",                 code: "weymouth" }
   ],
   Esperanto: [{ name: "Esperanto", code: "esperanto" }],
   Estonian: [{ name: "Estonian", code: "estonian" }],
   Finnish: [
      { name: "Finnish Bible (1776)",      code: "finnish1776" },
      { name: "Pyha Raamattu (1933 1938)", code: "pyharaamattu1933" },
      { name: "Pyha Raamattu (1992)",      code: "pyharaamattu1992" }
   ],
   French: [
      { name: "Martin (1744)",             code: "martin" },
      { name: "Louis Segond (1910)",       code: "ls1910" },
      { name: "Ostervald (1996 revision)", code: "ostervald" }
   ],
   Gaelic: [
      { name: "Manx Gaelic (Esther Jonah 4 Gospels)", code: "manxgaelic" },
      { name: "Scots Gaelic (Gospel of Mark)", code: "gaelic" }
   ],
   Georgian: [{ name: "Georgian (Gospels Acts James)", code: "georgian" }],
   German: [
      { name: "Luther (1912)",      code: "luther1912" },
      { name: "Elberfelder (1871)", code: "elberfelder" },
      { name: "Elberfelder (1905)", code: "elberfelder1905" },
      { name: "Luther (1545)",      code: "luther1545" },
      { name: "Schlachter (1951)",  code: "schlachter" }
   ],
   Gothic: [{ name: "Gothic (Nehemiah NT Portions)", code: "gothic" }],
   Greek: [
      { name: "Greek Modern",                             code: "moderngreek" },
      { name: "Textus Receptus",                          code: "text" },
      { name: "NT Byzantine Majority Text (2000) Parsed", code: "majoritytext" },
      { name: "NT Byzantine Majority Text (2000)",        code: "byzantine" },
      { name: "NT Textus Receptus (1550 1894) Parsed",    code: "textusreceptus" },
      { name: "NT Tischendorf 8th Ed",                    code: "tischendorf" },
      { name: "NT Westcott Hort UBS4 variants Parsed",    code: "westcotthort" },
      { name: "NT Westcott Hort UBS4 variants",           code: "westcott" },
      { name: "OT LXX Accented Roots Parsing",            code: "lxxpar" },
      { name: "OT LXX Accented",                          code: "lxx" },
      { name: "OT LXX Unaccented Roots Parsing",          code: "lxxunaccentspar" },
      { name: "OT LXX Unaccented",                        code: "lxxunaccents" }
   ],
   Hebrew: [
      { name: "Aleppo Codex",                   code: "aleppo" },
      { name: "Hebrew Modern",                  code: "modernhebrew" },
      { name: "OT BHS (Consonants Only)",       code: "bhsnovowels" },
      { name: "OT BHS (Consonants and Vowels)", code: "bhs" },
      { name: "OT WLC (Consonants Only)",       code: "wlcnovowels" },
      { name: "OT WLC (Consonants and Vowels)", code: "wlc" },
      { name: "OT Westminster Leningrad Codex", code: "codex" }
   ],
   Hungarian: [{ name: "Hungarian Karoli", code: "karoli" }],
   Italian: [
      { name: "Giovanni Diodati Bible (1649)", code: "giovanni" },
      { name: "Riveduta Bible (1927)",         code: "riveduta" }
   ],
   Kabyle: [{ name: "Kabyle NT", code: "kabyle" }],
   Korean: [{ name: "Korean",    code: "korean" }],
   Latin: [
      { name: "Nova Vulgata",       code: "newvulgate" },
      { name: "Vulgata Clementina", code: "vulgate" }
   ],
   Latvian: [{ name: "New Testament", code: "latvian" }],
   Lithuanian: [{ name: "Lithuanian", code: "lithuanian" }],
   Maori: [{ name: "Maori", code: "maori" }],
   Myanmar: [{ name: "Judson (1835)", code: "judson" }],
   Norwegian: [{ name: "Bibelselskap (1930)", code: "bibelselskap" }],
   Portuguese: [{ name: "Almeida Atualizada", code: "almeida" }],
   Potawatomi: [{ name: "Potawatomi (Matthew Acts) (Lykins 1844)", code: "potawatomi" }],
   Romani: [{ name: "Romani NT E Lashi Viasta (Gypsy)", code: "rom" }],
   Romanian: [{ name: "Cornilescu", code: "cornilescu" }],
   Russian: [
      { name: "Synodal Translation (1876)",            code: "synodal" },
      { name: "Makarij Translation Pentateuch (1825)", code: "makarij" },
      { name: "Victor Zhuromsky NT",                   code: "zhuromsky" }
   ],
   Spanish: [
      { name: "Reina Valera (1909)",        code: "valera" },
      { name: "Reina Valera NT (1858)",     code: "rv1858" },
      { name: "Sagradas Escrituras (1569)", code: "sse" }
   ],
   Swahili: [{ name: "Swahili", code: "swahili" }],
   Swedish: [{ name: "Swedish (1917)", code: "swedish" }],
   Tagalog: [{ name: "Ang Dating Biblia (1905)", code: "tagalog" }],
   Tamajaq: [{ name: "Tamajaq Portions", code: "tamajaq" }],
   Thai: [{ name: "Thai from kjv", code: "thai" }],
   Turkish: [
      { name: "Turkish",        code: "turkish" },
      { name: "NT (1987 1994)", code: "tnt" }
   ],
   Ukrainian: [{ name: "NT (P Kulish 1871)", code: "ukranian" }],
   Uma: [{ name: "Uma NT", code: "uma" }],
   Vietnamese: [{ name: "Vietnamese (1934)", code: "vietnamese" }],
   Wolof: [{ name: "Wolof NT", code: "wolof" }],
   Xhosa: [{ name: "Xhosa", code: "xhosa" }],
};

function getBook(target) {
   for (const bookObj of verseCounts) {
      if (bookObj.book == target) {
         return bookObj;
      }
   }
   return null;
}

function getVerseCount(bookObj, chapterNum) {
   if (chapterNum > bookObj.chapters.length) {
      console.log("Chapter number exceeded available.");
      return -1;
   } else {
      return bookObj.chapters[chapterNum-1].verses;
   }
}

/**
 * How to get books for versions
 * https://getbible.net/index.php?option=com_getbible&task=bible.books&format=json&v=kjv
 * How to get number of chapters
 * https://getbible.net/index.php?option=com_getbible&task=bible.chapter&format=json&v=kjv&nr=1
 *
 */
for (const language of Object.keys(versions)) {
   for (const version of versions[language]) {
      const code = version.code;

   }
}
