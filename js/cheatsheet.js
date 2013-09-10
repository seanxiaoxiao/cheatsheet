(function(window) {

    var Q_MARK_KEYCODE = 191;

    var entries = [];

    var groups = [];

    var currentEntries = null;

    var Group = function(name) {
        this.name = name;
        this.entries = [];
        return this;
    };

    var defaultGroup = new Group("");

    groups.push(defaultGroup);

    var Entry = function(handler) {
        this.chars = handler.chars.toUpperCase();
        this.callback = handler.callback;
        this.message = handler.message;
        this.ctrl = handler.ctrl;
        this.alt = handler.alt;
        this.shift = handler.shift;
        this.index = 0;
        return this;
    }

    Entry.prototype = {

        shortcuts: function() {
            var shortcuts = "";
            if (this.ctrl || this.shift || this.alt) {
                if (this.ctrl) {
                    shortcuts += "&ltctrl&gt + ";
                }
                if (this.shift) {
                    shortcuts += "&ltshift&gt + ";
                }
                if (this.alt) {
                    shortcuts += "&ltalt&gt + ";
                }
            }
            var chars = this.chars.toLowerCase();
            for (var i in chars) {
                shortcuts += chars[i] + " + ";
            }
            if (shortcuts.length >= 2) {
                return shortcuts.substring(0, shortcuts.length - 2);
            }
        },

        matchKeycode: function(keyContext) {
            if (this.ctrl && !keyContext.ctrl) {
                return false;
            }
            if (this.alt && !keyContext.alt) {
                return false;
            }
            if (this.shift && !keyContext.shift) {
                return false;
            }
            return this.chars[this.index] == String.fromCharCode(keyContext.keyCode);
        }
    }

    var starter = Q_MARK_KEYCODE;

    var resetEntries = function() {
        entries.forEach(function(entry) {
            entry.index = 0;
        });
    }

    var _addHandler = function(handler, group) {
        group.entries.push(handler);
        entries.push(handler);
    };

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
            if (!currentEntries) {
                currentEntries = entries;
            }
            tempEntries = [];
            var keyContext = {
                ctrl: event.ctrlKey,
                shift: event.shiftKey,
                alt: event.altKey,
                keyCode: event.keyCode
            }
            for (var i in currentEntries) {
                var entry = currentEntries[i];
                if (entry.matchKeycode(keyContext)) {
                    entry.index++;
                    if (entry.chars.length == entry.index) {
                        entry.callback();
                        currentEntries = null;
                        resetEntries();
                        break;
                    }
                    tempEntries.push(entry);
                }
            }
            if (tempEntries.length == 0) {
                resetEntries();
            }
            else {
                currentEntries = tempEntries;
            }
        }
    });

    window.cheetsheet = {

        changeStarter: function(key) {
            starter = key.charCodeAt(0);
        },

        addHandler: function(handler) {
            var handlerInstance = new Entry(handler);
            _addHandler(handlerInstance, defaultGroup);
        },

        addGroup: function(group) {
            var newGroup = new Group(group.name);
            groups.push(newGroup);
            if (group.handlers) {
                group.handlers.forEach(function(handler) {
                    var handlerInstance = new Entry(handler);
                    _addHandler(handlerInstance, newGroup);
                });
            }
        },

        showCheetSheet: function() {
            var cheetsheetDiv = document.createElement("div");
            cheetsheetDiv.setAttribute("id", "cheetsheet");
            document.getElementsByTagName("body")[0].appendChild(cheetsheetDiv);

            var count = 0;
            var cheetsheetRow;
            groups.forEach(function(group) {
                if (group.entries.length > 0) {
                    var groupTitle = document.createElement("div");
                    groupTitle.setAttribute("class", "group-title");
                    groupTitle.innerHTML = group.name;
                    cheetsheetDiv.appendChild(groupTitle);
                }
                group.entries.forEach(function(entry) {
                    if (entry) {
                        if (count == 0) {
                            cheetsheetRow = document.createElement("div");
                            cheetsheetRow.setAttribute("class", "cheetsheet-row");
                            cheetsheetDiv.appendChild(cheetsheetRow);
                        }
                        count++;
                        var cheetsheetCell = document.createElement("div");
                        cheetsheetCell.setAttribute("class", "cheetsheet-cell");
                        
                        var shortCutCell = document.createElement("span");
                        shortCutCell.setAttribute("class", "cheetsheet-shortcut");
                        shortCutCell.innerHTML = entry.shortcuts() + ":";
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
                });
                var groupTail = document.createElement("div");
                groupTail.setAttribute("class", "group-tail");
                cheetsheetDiv.appendChild(groupTail);
            });
        },

        dismissCheetSheet: function() {
            var cheetsheet = document.getElementById("cheetsheet");
            cheetsheet.parentNode.removeChild(cheetsheet);
        }
    
    };

    var cheetsheet = window.cheetsheet;
    
}(this));