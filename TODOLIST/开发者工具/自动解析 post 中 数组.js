var test = {
    id: 1,
    ids: {
        id: [1, 2, 3, 4, 5, 6],
        name: 'sunhao',
        doc: {
            id: 1,
            commit: {
                name: 'ssdg',
                value: [10, 11, 12]
            }
        }
    },
    idSS: [7, 8, 9]
};

function autoArrayToObject(value) {
    var index = '';
    for (index in value) {
        if (value.hasOwnProperty(index)) {
            if (value[index].constructor === Array) {
                value[index] = _autoArrayToObject(value[index]);
            } else if (value[index].constructor === Object) {
                autoArrayToObject(value[index])
            }
        }
    }
    function _autoArrayToObject(array) {
        var step = Object.create(null);
        for (i = 0; i < array.length; i++) {
            step[i] = array[i];
        }
        return step;
    }
}

autoArrayToObject(test);

JSON.stringify(test);