cheatsheet
==========

This component provides a gmail look and feel cheatsheet, in which you can bind any callback function with the specified key combination.

##Screen Shot
![I am screen shot](https://raw.github.com/seanxiaoxiao/cheatsheet/master/screenshot.png)

##Features

1. Single Key binding.
2. Multiple Keys binding.
3. Shortcut groups.
4. Support ctrl/alt/shift to combine with other keys.
5. Toggle '?' to show and hide the cheetsheet.

##How to Start

To begin, you should import cheatsheet.js and cheatsheet.css to your web page.

####Add Handler

```
cheetsheet.addHandler({
    chars: "ph",
    message: "Print Hello",
    callback: function() {
        document.getElementById("text-area").value += "Hello\n";
    }
});
```

####Add Group

```
cheetsheet.addGroup({
    name: "Show/Hide Textarea",
    handlers: [{
        chars: "h",
        ctrl: true,
        message: "Hide the textarea",
        callback: function() {
            document.getElementById("text-area").setAttribute("style", "display: none");
        }
    }, {
        chars: "s",
        alt: true,
        message: "Show the textarea", 
        callback: function() {
            document.getElementById("text-area").setAttribute("style", "");
        }
    }]
});
```

Please checkout the demo.html for more information.

##Future Work

1. Configurable cheatsheet layout.
2. Be more robust.
