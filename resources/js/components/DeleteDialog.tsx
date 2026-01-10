export default function DeleteDialog({
    isOpen,
    onClose,
    onConfirm,
    title = 'Подтвердить Удаление',
    message = 'Вы уверены что хотите удалить пользователя ?',
    confirmButtonText = 'Удалить',
    cancelButtonText = 'Отмена',
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50" aria-modal="true">
            <div className="z-40 w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-lg font-medium text-gray-900">{title}</h3>
                <p className="mb-6 text-sm text-gray-600">{message}</p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none"
                    >
                        {cancelButtonText}
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                    >
                        {confirmButtonText}
                    </button>
                </div>
            </div>
        </div>
    );
}