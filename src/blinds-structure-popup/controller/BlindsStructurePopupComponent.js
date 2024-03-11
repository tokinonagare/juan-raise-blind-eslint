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
} from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { Localization } from 'laiwan_localization';
import BlindsStructureList from '../view/BlindsStructureList';
import styles from './style/BlindsStructurePopupComponentStyle';
import CreateBlindStructureList from '../model/CreateBlindsStructureList';

const BlindStructurePopupComponent = forwardRef(({
    timeBasedRules,
    CurrentLevel,
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
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.modalTitle}>
                        <View style={styles.modalTitleItem}/>
                        <View style={styles.modalTitleTextContainer}>
                            <Text style={styles.modalTitleText}>
                                {Localization.translate('raise_blind_detail')}
                            </Text>
                        </View>
                        <View style={styles.modalCloseButtonContainer}>
                            <Pressable
                                style={styles.modalCloseButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.modalTitleText}>✕</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.tableContainer}>
                        <BlindsStructureList
                            TimeBasedRules={list}
                            CurrentLevel={CurrentLevel}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
});

export default BlindStructurePopupComponent;
