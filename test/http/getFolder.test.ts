import { GETFolder } from '@main/http/GETFolder'
import { describe, it, expect } from 'vitest'

describe.skip('Get Folder Test', () => {
  it('should return a list of folder items', async () => {
    const result = await GETFolder('01VFVMOAGDZWNVJR6FLFDJXTBKZNOWGLNC')

    console.log(result)
  })
})

// 01VFVMOAGDZWNVJR6FLFDJXTBKZNOWGLNC // pricing schedules

// [
//   {
//     id: '01VFVMOAGONVSNZOW54ZBZUJZ7T46N5KUR',
//     name: 'Blind Specs',
//     isFolder: true,
//     isFile: false,
//     lastModified: '2026-04-11T22:39:14Z',
//     size: 2264554
//   },
//   {
//     id: '01VFVMOAFTNR3TDZEP2RGYBEHZU5M4WPYJ',
//     name: 'Colleen Hurst',
//     isFolder: true,
//     isFile: false,
//     lastModified: '2026-04-10T23:08:36Z',
//     size: 58847
//   },
//   {
//     id: '01VFVMOAEPH2B72PIHJNBYWJDJZL2ZZQIW',
//     name: 'Confirmed Orders',
//     isFolder: true,
//     isFile: false,
//     lastModified: '2026-04-26T06:37:56Z',
//     size: 893165
//   },
//   {
//     id: '01VFVMOAAAFJYNVJRDDRELQBP4EHVVBZTF',
//     name: 'Curtain Specs',
//     isFolder: true,
//     isFile: false,
//     lastModified: '2026-04-12T04:02:13Z',
//     size: 124691
//   },
//   {
//     id: '01VFVMOAB5NYKNEK4WOJELK3E4XZK5ZKFJ',
//     name: 'Database',
//     isFolder: true,
//     isFile: false,
//     lastModified: '2026-04-27T10:24:12Z',
//     size: 60854012
//   },
//   {
//     id: '01VFVMOAGVDJTZ6E2VRRCYGK53XBG5QL3N',
//     name: 'Dave Martin',
//     isFolder: true,
//     isFile: false,
//     lastModified: '2026-10-08T04:39:30Z',
//     size: 0
//   },
//   {
//     id: '01VFVMOAGVZ2MU4CRWEBFZ2L6FBWZDUL46',
//     name: 'Debbie Camm',
//     isFolder: true,
//     isFile: false,
//     lastModified: '2026-04-10T23:08:48Z',
//     size: 35293269
//   },
//   {
//     id: '01VFVMOAAV5H6ZAXCHNFBI2L4P3S3T6EAL',
//     name: 'Fabric Chips',
//     isFolder: true,
//     isFile: false,
//     lastModified: '2026-10-07T05:00:51Z',
//     size: 15523047366
//   },
//   {
//     id: '01VFVMOAHOIADMXKUS2ZB2LEP4MXJ4NRBH',
//     name: 'Gemma Munn',
//     isFolder: true,
//     isFile: false,
//     lastModified: '2026-10-08T04:39:43Z',
//     size: 0
//   },
//   {
//     id: '01VFVMOAD7L3Y3HRPRY5GJWCS3WT4EMF5Q',
//     name: 'History',
//     isFolder: true,
//     isFile: false,
//     lastModified: '2026-04-25T23:42:00Z',
//     size: 31554072
//   },
//   {
//     id: '01VFVMOAG77RPCSPXOVVEKVOWOFTM6KWOT',
//     name: 'Joshua April',
//     isFolder: true,
//     isFile: false,
//     lastModified: '2026-06-07T22:55:36Z',
//     size: 85218
//   },
//   {
//     id: '01VFVMOABF6D5M5TRF2ZCJMHSH3CRNMSA2',
//     name: 'Judy Donald',
//     isFolder: true,
//     isFile: false,
//     lastModified: '2026-05-13T07:20:12Z',
//     size: 0
//   },
//   {
//     id: '01VFVMOABEDRE5XCPNLVGYWAAVZJGEDQKY',
//     name: 'Kiran April',
//     isFolder: true,
//     isFile: false,
//     lastModified: '2026-04-10T23:09:13Z',
//     size: 1899153
//   },
//   {
//     id: '01VFVMOAAKRXYCA52UIBGZIMWAJEFGFFXS',
//     name: 'Sarah Holdaway',
//     isFolder: true,
//     isFile: false,
//     lastModified: '2026-04-10T23:10:27Z',
//     size: 11971026
//   },
//   {
//     id: '01VFVMOAAYUS3GYCVLANHZJ2V2UBSSHTF5',
//     name: 'Sonia Galyer',
//     isFolder: true,
//     isFile: false,
//     lastModified: '2026-07-01T01:12:56Z',
//     size: 15302
//   },
//   {
//     id: '01VFVMOAFN476XWRMF6NELJCKC23P2YGXK',
//     name: 'Tate Watene',
//     isFolder: true,
//     isFile: false,
//     lastModified: '2026-04-10T23:10:37Z',
//     size: 11671754
//   },
//   {
//     id: '01VFVMOAEMGNU2CGTZBNH2X4UH47IH5MR4',
//     name: 'Terry Donald',
//     isFolder: true,
//     isFile: false,
//     lastModified: '2026-04-10T23:10:46Z',
//     size: 156906
//   },
//   {
//     id: '01VFVMOAEXWEB2T7FZJFBJHC5VRDTTZYW4',
//     name: 'Yo Dawson',
//     isFolder: true,
//     isFile: false,
//     lastModified: '2026-04-10T23:10:56Z',
//     size: 11771690
//   },
//   {
//     id: '01VFVMOAFNN7UD2EUSYNG3IQMGYYFDVAFS',
//     name: 'Email Tag.jpg',
//     isFolder: false,
//     isFile: true,
//     lastModified: '2026-03-11T08:15:00Z',
//     size: 122269
//   },
//   {
//     id: '01VFVMOAADFKAFS5ZQARH2ABY5HQ6JAODQ',
//     name: "Lewis's Logo 2 - Narrow Version.jpg",
//     isFolder: false,
//     isFile: true,
//     lastModified: '2020-04-14T23:09:37Z',
//     size: 45817
//   },
//   {
//     id: '01VFVMOAGNFNRB5NCMQRGK762JFJWEOVCZ',
//     name: "Lewis's Terms and Conditions.pdf",
//     isFolder: false,
//     isFile: true,
//     lastModified: '2026-05-05T01:41:00Z',
//     size: 100594
//   },
//   {
//     id: '01VFVMOAHK5O5NBDXBTFAKB3CIIRBUQRFK',
//     name: 'Staff.xlsx',
//     isFolder: false,
//     isFile: true,
//     lastModified: '2026-10-08T04:33:14Z',
//     size: 12351
//   }
// ]
