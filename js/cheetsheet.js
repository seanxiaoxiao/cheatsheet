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
                if (currentEntry.chars[currentEntry.index] == String.fromCharCode(event.keyCode)) {
                    currentEntry.index++;
                    if (currentEntry.chars.length == currentEntry.index) {
                        currentEntry.callback();
                        currentEntry.index = 0;
                        currentEntry = null;
                    }
                }
                else {
                    currentEntry.index = 0;
                    currentEntry = null;
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
            var cheetsheetRow;
            entries.forEach(function(entry) {
                if (entry != null) {
                    if (count == 0) {
                        cheetsheetRow = document.createElement("div");
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
                    shortcuts = shortcuts + ":";
                    var shortCutCell = document.createElement("span");
                    shortCutCell.setAttribute("class", "cheetsheet-shortcut");
                    shortCutCell.innerHTML = shortcuts;
                    cheetsheetCell.appendChild(shortCutCell);

                    var messageCell = document.createElement("span");
                    messageCell.setAttribute("class", "cheetsheet-message");
                    messageCell.innerHTML = entry.message;
                    cheetsheetCell.appendChild(messageCell);

                    cheetsheetRow.appendChild(cheetsheetCell);

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