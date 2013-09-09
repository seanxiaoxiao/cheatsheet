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

    document.addEventListener('keydown', function(event) {
        if (event.keyCode <= 46) {
            return;
        }
        console.log(event.keyCode);
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
                for (var i in entries) {
                    var entry = entries[i];
                    if (entry != null && entry.chars[0] == String.fromCharCode(event.keyCode)) {
                        currentEntry = entry;
                        break;
                    }
                }
            }
            if (currentEntry) {
                if (entry.chars[entry.index] == String.fromCharCode(event.keyCode)) {
                    entry.index++;
                    if (entry.chars.length == entry.index) {
                        entry.callback();
                        currentEntry = null;
                        entry.index = 0;
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
            shortcuts = shortcuts.toUpperCase();
            entries.push(new Entry(shortcuts, message, callback));
        },

        addSplit: function() {
            entries.push(null);
        },

        showCheetSheet: function() {
            var cheetsheetDiv = document.createElement("div");
            cheetsheetDiv.setAttribute("id", "cheetsheet");
            document.getElementsByTagName("body")[0].appendChild(cheetsheetDiv);

            var count = 0;
            entries.forEach(function(entry) {
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
                    for (var i in entry.chars) {
                        shortcuts += entry.chars[i] + "+";
                    }
                    shortcuts = shortcuts.substring(0, shortcuts.length - 1);
                    var shortCutCell = document.createElement("span");
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
            });
        },

        dismissCheetSheet: function() {
            var cheetsheet = document.getElementById("cheetsheet");
            cheetsheet.parentNode.removeChild(cheetsheet);
        }
    
    };

    var cheetsheet = window.cheetsheet;
    
}(this));