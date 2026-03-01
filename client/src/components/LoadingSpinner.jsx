export default function LoadingSpinner() {
    return (
        <div className="w-full h-[50vh] flex items-center justify-center">
            <div className="w-12 h-12 border-2 border-gold/30 border-t-gold rounded-full animate-spin"></div>
        </div>
    );
}
