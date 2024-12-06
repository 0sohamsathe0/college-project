import React from 'react'

const MatchesPlayed = () => {
    return (
        <>
            <h1 className='font-bold text-3xl mt-10 text-[#0b0b51] text-center'>Matches Played</h1>
            <div class=" mt-5 overflow-x-auto shadow-md rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-[#0b0b51] ">
                    <thead class="text-xs text-[#0b0b51] uppercase bg-yellow-500 ">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Tournament Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Event Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Rank
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b  hover:bg-gray-50 ">
                            <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap text-[#0b0b51]">
                                International Fencing Compition
                            </th>
                            <td class="px-6 py-4">
                                Saber
                            </td>
                            <td class="px-6 py-4">
                                10th
                            </td>
                            <td class="px-6 py-4">
                                12-2-2022
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default MatchesPlayed
