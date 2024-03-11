/*
    This is a virtual class (actual localization is complex),
    so you need to implement one.
 */
class Localization {
    translate = (key) => {
        // Translate to English, please implement specific logic here.
        switch (key) {
            case 'raise_blind_detail': return 'Blinds Structure';
            case 'raise_blind_interval': return 'Enable Raise Blinds';
            case 'user_level': return 'Level';
            case 'times': return 'Time';
            case 'blind_label': return 'Blinds';
            case 'home_label': return 'Home';
            case 'preview_blinds_structure_label': return 'Preview Blinds Structure';
            case 'button_show_modal': return 'Blinds Structure Popup';
            default:
                console.log('key', key);
        }
        return 'undefined';
    };
}

export default new Localization();
