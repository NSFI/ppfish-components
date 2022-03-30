(() => {
    let env = global || window;

    const toCamel = (key) => {
        if (!key) { return ''; }
        let arr = key.split('-');
        return arr.map(k => k[0].toUpperCase() + k.slice(1)).join('');
    };

    function importAll(r) {
        r.keys().forEach(key => {
            let component = r(key).default;
            let _key = key.replace('./', '').replace('.svg', '');//去除key 里面的./ 和.svg
            let name = toCamel(_key);
            env['Icon' + name] = component;
        });
    }

    importAll(require.context('./icons/', true, /\.svg$/));
})();
