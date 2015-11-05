var validators = {
    
    required: function(val) {
        if (typeof val === 'undefined') {
            return '% is required.';
        }
    },
    
    url: function(val) {
        if (typeof val === 'undefined') val = '';
        
        if (!val.match(/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i)) {
            return '% is not a valid URL.';
        }
    },
    
    min: function(val, len) {
        if (val.length < len) {
            return '% should at least be '+ len +' characters long.';
        }
    },
    
    max: function(val, len) {
        if (val.length > len) {
            return '% exceeds '+ len +' characters.';
        }
    },
    
    exactly: function(val, len) {
        if (val.length !== len) {
            return '% is not exactly '+ len +' characters.';
        }
    },
    
    int: function(val) {
        if (typeof val === 'undefined') val = '';
        
        if (!val.match(/^\d+$/)) {
            return '% is not an integer.';
        }
    }
    
};

function preprocessRules(rules) {
    if (typeof rules === 'string') {
        rules = rules.split('|');
    }
    
    // Extract arguments from rules.
    // Transforms max:255 to [max, [255]]
    // and in:and,or,not to [in, [and, or, not]]
    for (var i in rules) {
        var rule = rules[i].split(':');
        if (rule.length > 1) {
            rules[i] = [rule[0], rule[1].split(',')];
        } else {
            rules[i] = [rule[0], []];
        }
    }
    
    return rules;
};

module.exports = function (data, ruleset) {
    
    var errors = [];
    
    for (var key in ruleset) {   
        
        var rules = preprocessRules(ruleset[key]);
        
        for (var i in rules) {
            var fn = rules[i][0];
            var args = [data[key]].concat(rules[i][1]);
            var result = validators[fn].apply(data[key], args);
            
            if (typeof result !== 'undefined') {
                errors.push(result.replace('%', key));
            }
        }
        
    }
    
    return {
        passes: errors.length === 0 ? true : false,
        errors: errors
    };
    
};