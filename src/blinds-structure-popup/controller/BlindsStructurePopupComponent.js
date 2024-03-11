import React, {
    useState,
    useEffect,
    useImperativeHandle,
    forwardRef,
} from 'react';
import {
    View,
    Modal,
    Text,
    Pressable,
    TouchableWithoutFeedback,
} from 'react-native';
// eslint-disable-next-line import/no-unresolved
import Localization from '../../../lib/laiwan_localization/laiwan_localization';
import BlindsStructureList from '../view/BlindsStructureList';
import styles from './style/BlindsStructurePopupComponentStyle';
import CreateBlindStructureList from '../model/CreateBlindsStructureList';

const BlindStructurePopupComponent = forwardRef(({
    timeBasedRules,
    currentLevel,
}, ref) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [list, setList] = useState(null);

    useEffect(() => {
        setList(timeBasedRules == null ? null : CreateBlindStructureList(timeBasedRules));
    }, [timeBasedRules]);

    useImperativeHandle(ref, () => ({
        show: () => setModalVisible(true),
        hide: () => setModalVisible(false),
    }));

    return (
        <Modal
            animationType="slide"
            transparent
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <TouchableWithoutFeedback
                onPress={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalView}>
                            <View style={styles.modalTitle}>
                                <Text style={styles.modalTitleText}>
                                    {Localization.translate('raise_blind_detail')}
                                </Text>
                            </View>
                            <Pressable
                                style={styles.modalCloseButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.modalTitleText}>✕</Text>
                            </Pressable>
                            <View style={styles.tableContainer}>
                                <BlindsStructureList
                                    timeBasedRules={list}
                                    currentLevel={currentLevel}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
});

export default BlindStructurePopupComponent;
