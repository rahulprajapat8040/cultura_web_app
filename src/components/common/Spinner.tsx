const Spinner = ({ color = '#fff' }: { color?: string }) => {
    return (
        <div
            className={`w-5 h-5 border-2 border-gray-300 rounded-full animate-spin`}
            style={{ borderTopColor: color }}
        />
    )
}

export default Spinner;