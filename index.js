angular.module('KeyGenApp', [])
    .controller('GenerateKeywordController', function() {
        var key_gen = this;
        key_gen.todos = [
            { text: 'learn AngularJS', done: true },
            { text: 'build an AngularJS app', done: false }
        ];

        Array.prototype.contains = function(v) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] === v) return true;
            }
            return false;
        };

        Array.prototype.unique = function() {
            var arr = [];
            for (var i = 0; i < this.length; i++) {
                if (!arr.contains(this[i])) {
                    arr.push(this[i]);
                }
            }
            return arr;
        }



        function do_sth(spl) {
            spl = spl.split(' ')
            abc = []

            spl.forEach(function(value, i) {
                xyz = []
                for (b = 0; b <= i; b++) {
                    xyz = xyz.concat(spl[b]);

                }
                text = xyz.join(' ');
                if (text.length > 1)
                abc = abc.concat(text);
            });
            return abc;
        }

        key_gen.copyToClipboard = function (elem_name) {
            // create hidden text element, if it doesn't already exist

            elem = document.getElementById(elem_name)
            var targetId = "_hiddenCopyText_";
            var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
            var origSelectionStart, origSelectionEnd;
            if (isInput) {
                // can just use the original source element for the selection and copy
                target = elem;
                origSelectionStart = elem.selectionStart;
                origSelectionEnd = elem.selectionEnd;
            } else {
                // must use a temporary form element for the selection and copy
                target = document.getElementById(targetId);
                if (!target) {
                    var target = document.createElement("textarea");
                    target.style.position = "absolute";
                    target.style.left = "-9999px";
                    target.style.top = "0";
                    target.id = targetId;
                    document.body.appendChild(target);
                }
                target.textContent = elem.textContent;
            }
            // select the content
            var currentFocus = document.activeElement;
            target.focus();
            target.setSelectionRange(0, target.value.length);

            // copy the selection
            var succeed;
            try {
                succeed = document.execCommand("copy");
            } catch (e) {
                succeed = false;
            }
            // restore original focus
            if (currentFocus && typeof currentFocus.focus === "function") {
                currentFocus.focus();
            }

            if (isInput) {
                // restore prior selection
                elem.setSelectionRange(origSelectionStart, origSelectionEnd);
            } else {
                // clear temporary content
                target.textContent = "";
            }
            return succeed;
        }

        key_gen.generate_keywords = function() {

            str = key_gen.heading

            splited2 = splited = str.split(' ')

            all_strs = []
            c = ""

            splited.forEach(function(value, i) {
                c = splited[i]

                splited2.forEach(function(spl2, j) {
                    if (i != j) {
                        c += " " + spl2
                    }
                });
                all_strs = all_strs.concat(do_sth(c))
            });

            key_gen.all_kg = all_strs.unique().join(', ');
        };
    });
