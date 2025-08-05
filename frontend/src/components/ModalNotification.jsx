import { useEffect, useRef } from "react";

export default function ModalNotification({
    open,
    alerts = [],
    onClose,
    buttonLabel = "Close"
}) {
    const dialogRef = useRef(null);

    useEffect(() => {
        if (open) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [open]);

    return (
        <dialog ref={dialogRef} className="modal-dialog">
            <h2>Signal Alert!!</h2>

            {alerts.length > 0 ? (
                alerts.map((alert, idx) => (
                    <p key={idx}>
                        It is a <strong>{alert.sign}</strong> sign for{" "}
                        <strong>{alert.symbol}</strong>
                    </p>
                ))
            ) : (
                <p>No alerts</p>
            )}

            <form method="dialog">
                <button onClick={onClose}>{buttonLabel}</button>
            </form>
        </dialog>
    );
}