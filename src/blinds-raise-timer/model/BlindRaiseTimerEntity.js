export default class BlindRaiseTimerEntity {
    constructor(props) {
        this.currency = props.currency;
        this.currentBlinds = props.currentBlinds;
        this.countdownSeconds = props.countdownSeconds;
        this.nextBlind = props.nextBlind;
        this.timeInterval = props.timeInterval;
        this.blindRaised = props.blindRaised;
    }
}
