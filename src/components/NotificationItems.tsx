import { PiCheckCircleFill, PiInfoFill, PiWarningFill } from "react-icons/pi";
import "../styles/toastNotificationStack.css";
import { SnackbarMessage } from "notistack";

interface NotificationItemProps {
    message: SnackbarMessage;
}

export function NotificationSuccess(props: NotificationItemProps) {
    const { message } = props;

    return (
        <div className="success-toast">
            <div className="toast-head">
                <PiCheckCircleFill /> Success
            </div>
            <p className="toast-info">{message}</p>
        </div>
    );
}

export function NotificationError(props: NotificationItemProps) {
    const { message } = props;

    return (
        <div className="error-toast">
            <div className="toast-head">
                <PiInfoFill /> Error
            </div>
            <p className="toast-info">{message}</p>
        </div>
    );
}

export function NotificationInfo(props: NotificationItemProps) {
    const { message } = props;

    return (
        <div className="warning-toast">
            <div className="toast-head">
                <PiWarningFill /> Warning
            </div>
            <p className="toast-info">{message}</p>
        </div>
    );
}
