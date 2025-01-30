export default function Button({lable , type}){
    return(
        <button
            type={type}
            className='w-full text-dark bg-yellow-600  hover:bg-yellow-700  focus:ring-4 focus:outline-none focus:ring-yellow-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600  dark:hover:bg-yellow-700  dark:focus:ring-yellow-800 '
        >
            {lable}
        </button>
    )
}