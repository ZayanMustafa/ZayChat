export default function Button({ lable, disabled, type }) {
    return (
        <button
            type={type}
            disabled={disabled}
            className={`w-full text-dark ${disabled ? 'bg-gray-400' : 'bg-yellow-600 hover:bg-yellow-700'} focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
        >
            {lable}
        </button>

    )
}