(function(window) {

    var Q_MARK_KEYCODE = 191;

    var entries = [];

    var currentEntry = null;

    var Entry = function(chars, message, callback) {
        this.chars = chars;
        this.callback = callback;
        this.index = 0;
        this.message = message;
        return this;
    }

    var starter = Q_MARK_KEYCODE;

    document.addEventListener('keydownn', function(event) {
        if (event.keyCode == starter) {
            if (document.getElementById("cheetsheet")) {
                cheetsheet.dismissCheetSheet();
            }
            else {
                cheetsheet.showCheetSheet();    
            }
            
        }
        else {
            if (!currentEntry) {
                for (entry in entries) {
                    if (entry != null && entry.chars[0].charCodeAt(0) == keyCode) {
                        currentEntry = entry;
                        break;
                    }
                }
                return;
            }
            if (currentEntry) {
                if (entry.chars[index].charCodeAt(0) == keyCode) {
                    entry.index++;
                    if (entry.chars.length == entry.index) {
                        entry.callback();
                    }
                }
                else {
                    currentEntry = null;
                    entry.index = 0;
                }
            }
        }
    });

    window.cheetsheet = {

        changeStarter: function(key) {
            starter = key.charCodeAt(0);
        },

        addHandler: function(shortcuts, message, callback) {
            entries.push(new Entry(shortcuts, message, callback));
        },

        addSplit: function() {
            entries.push(null);
        },

        showCheetSheet: function() {
            var cheetsheetDiv = document.createElement("div");
            cheetsheetDiv.setAttribute("id", "cheetsheet");

            var count = 0;
            for (entry in entries) {
                if (entry != null) {
                    if (count == 0) {
                        var cheetsheetRow = document.createElement("div");
                        cheetsheetRow.setAttribute("class", "cheetsheet-row");
                        cheetsheetDiv.appendChild(cheetsheetRow);
                    }
                    count++;
                    var cheetsheetCell = document.createElement("div");
                    cheetsheetCell.setAttribute("class", "cheetsheet-cell");
                    var shortcuts = "";
                    for (word in entry.chars) {
                        shortcuts += word + "+";
                    }
                    shortcuts = shortcuts.substring(0, shortcuts.length - 1);
                    var shortCutsCell = document.createElement("span");
                    shortCutCell.setAttribute("class", "cheetsheet-shortcut");
                    cheetsheetCell.appendChild(shortCutCell);

                    var messageCell = document.createElement("span");
                    messageCell.setAttribute("class", "cheetsheet-span");
                    cheetsheetCell.appendChild(messageCell);

                    if (count == 2) {
                        count = 0;
                    }
                }
                else {
                    var cheetsheetSplit = document.createElement("div");
                    cheetsheetSplit.setAttribute("class", "cheetsheet-spilt");
                    cheetsheetDiv.appendChild(cheetsheetSplit);
                }
            }
        },

        dismissCheetSheet: function() {
            
        }
    
    };

    var cheetsheet = window.cheetsheet;
    
}(this));