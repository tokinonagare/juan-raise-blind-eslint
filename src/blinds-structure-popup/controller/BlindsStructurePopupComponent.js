import React, { useState, useEffect } from 'react';
import {
    View, Modal, Text, Pressable, Button,
} from 'react-native';
import BlindsStructureList from '../view/BlindsStructureList';
import styles from './style/BlindsStructurePopupComponentStyle';
import Localization from '../../../lib/localization/Localization';
import CreateBlindStructureList from '../model/CreateBlindsStructureList';

const BlindStructurePopupComponent = ({ TimeBasedRules, CurrentLevel }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const [list, setList] = useState(null);

    useEffect(() => {
        setList(TimeBasedRules == null ? null : CreateBlindStructureList(TimeBasedRules));
    }, [TimeBasedRules]);

    return (
        <View>
            <Button
                onPress={
                    () => setModalVisible(!modalVisible)
                }
                title={Localization.translate('button_show_modal')}
            />
            <Modal
                animationType="slide"
                transparent
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
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
                                    onPress={() => setModalVisible(!modalVisible)}
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
        </View>
    );
};

export default BlindStructurePopupComponent;
