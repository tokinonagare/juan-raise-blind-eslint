/*
    This is a virtual class (actual localization is complex),
    so you need to implement one.
 */
class Localization {
    translate = (key) => {
        // Translate to English, please implement specific logic here.
        console.log('key', key);
    };
}

export default new Localization();
