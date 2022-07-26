import mw from "./m-wind"

const styles = {
    input: mw(`
        bg-gray-50 border border-gray-300 text-gray-900 text-sm 
        rounded focus:ring-blue-500 focus:border-blue-500 
        block w-full py-1.5 px-2 placeholder:italic placeholder:text-slate-400
        outline-teal-800 
    `),
    input1: mw(`
        block w-full rounded-md border-gray-200 text-sm transition focus:border-blue-600 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75
    `),
    label: mw(`
        mb-1 text-xs font-medium text-teal-900 dark:text-gray-300
    `),
    error: mw(`
        ml-2 mt-1 text-xs text-red-900
    `)
}

export default styles