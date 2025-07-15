interface SpinnerProps {
    color?: string
    size?: string
}

const Spinner = ({ color = '#fff', size = "20px" }: SpinnerProps) => {
    return (
        <div
            className={`border-2 border-gray-300 rounded-full animate-spin`}
            style={{
                borderTopColor: color,
                width: size,
                height: size
            }}
        />
    )
}

export default Spinner;