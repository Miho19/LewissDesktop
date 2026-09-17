import { getKineticsCellularPDFContentAsync } from '@main/pdf/kinetics/kineticsCellular'
import { getDeliverToText } from '@main/pdf/shared'
import { Blind } from '@shared/types/blind/blind.types'
import { CreateWorksheetPDFFn } from '@shared/types/pdf.types'
import { Worksheet } from '@shared/types/worksheet/Worksheet.types'
import { Content, TDocumentDefinitions, TDocumentInformation } from 'pdfmake/interfaces'

export async function generateWorksheetPDF(worksheet: Worksheet) {
  const { blindType } = worksheet

  const createContentFunction = blindTypeMappedToCreateWorksheetPDFFunction[blindType]
  if (typeof createContentFunction === 'undefined')
    throw new Error(`${blindType} does not have a pdf content creation function`)

  const content = await createContentFunction(worksheet)
  const metaData = getDocumentMetaData(worksheet)

  const deliverToText = getDeliverToText()

  const document: TDocumentDefinitions = {
    content: content,
    info: metaData,
    pageOrientation: 'landscape',
    footer: (currentPage, pageCount) => {
      return { stack: [deliverToText, getPageNumberText(currentPage, pageCount)] }
    }
  }

  return document
}

function getDocumentMetaData(worksheet: Worksheet) {
  const meta: TDocumentInformation = {
    title: getDocumentTitle(worksheet),
    author: getAuthor(worksheet),
    creator: 'lewiss-processing'
  }

  return meta
}

function getDocumentTitle(worksheet: Worksheet) {
  const { blindType, customer } = worksheet
  const { customerName, reference } = customer

  const productTitle = getProductTitle(blindType)

  const documentTitle = [customerName, reference, productTitle].join('-')

  return documentTitle
}

function getProductTitle(blindType: Blind) {
  switch (blindType) {
    case 'Kinetics 10mm Cellular Blind':
      return 'cellular-blind-10'
    case 'Kinetics 20mm Cellular Blind':
      return 'cellular-blind-20'
    default:
      throw new Error(`${blindType} does not have a product title`)
  }
}

function getAuthor(worksheet: Worksheet) {
  const { customer } = worksheet
  const { salesConsultant } = customer

  const currentUser = process.env.USERNAME
  if (currentUser == null || currentUser.length === 0) return salesConsultant

  return currentUser
}

const blindTypeMappedToCreateWorksheetPDFFunction: Record<Blind, CreateWorksheetPDFFn> = {
  'Kinetics 10mm Cellular Blind': getKineticsCellularPDFContentAsync,
  'Kinetics 20mm Cellular Blind': getKineticsCellularPDFContentAsync,
  'Kinetics Sunscreen Roller Blind': function (worksheet: Worksheet): Promise<Content[]> {
    throw new Error('Function not implemented.')
  },
  'Kinetics Blockout Roller Blind': function (worksheet: Worksheet): Promise<Content[]> {
    throw new Error('Function not implemented.')
  },
  'Kinetics Light Filtering Roller Blind': function (worksheet: Worksheet): Promise<Content[]> {
    throw new Error('Function not implemented.')
  },
  "Lewis's 25mm Aluminium Venetian": function (worksheet: Worksheet): Promise<Content[]> {
    throw new Error('Function not implemented.')
  },
  "Lewis's 50mm Aluminium Venetian": function (worksheet: Worksheet): Promise<Content[]> {
    throw new Error('Function not implemented.')
  },
  "Lewis's 50mm Fauxwood Venetian": function (worksheet: Worksheet): Promise<Content[]> {
    throw new Error('Function not implemented.')
  },
  "Lewis's 63mm Fauxwood Venetian": function (worksheet: Worksheet): Promise<Content[]> {
    throw new Error('Function not implemented.')
  },
  "Lewis's 50mm Phoenixwood Venetian": function (worksheet: Worksheet): Promise<Content[]> {
    throw new Error('Function not implemented.')
  },
  "Lewis's 63mm Phoenixwood Venetian": function (worksheet: Worksheet): Promise<Content[]> {
    throw new Error('Function not implemented.')
  },
  'Kinetics Mikronwood 50mm Venetian': function (worksheet: Worksheet): Promise<Content[]> {
    throw new Error('Function not implemented.')
  },
  'Santa Fe Woodlore Shutter': function (worksheet: Worksheet): Promise<Content[]> {
    throw new Error('Function not implemented.')
  },
  'Santa Fe Woodlore Plus Shutter': function (worksheet: Worksheet): Promise<Content[]> {
    throw new Error('Function not implemented.')
  },
  'Santa Fe Waterproof Woodlore Plus Shutter': function (worksheet: Worksheet): Promise<Content[]> {
    throw new Error('Function not implemented.')
  },
  'Santa Fe Normandy Shutter': function (worksheet: Worksheet): Promise<Content[]> {
    throw new Error('Function not implemented.')
  }
}

function getPageNumberText(currentPage: number, pageCount: number): Content {
  if (pageCount === 1) return { text: '', margin: [0, 0, 0, 0] }
  return {
    text: `${currentPage}/${pageCount}`,
    alignment: 'center',
    margin: [0, 5, 0, 5]
  }
}

// export async function openPDFDocumentAsync(document: TDocumentDefinitions) {
//   const pdfDocument = await getPDFDocumentAsync(document);
//   pdfDocument.open();
// }

// export async function getPDFDocumentAsync(document: TDocumentDefinitions) {
//   const pdfmake = (await import("pdfmake/build/pdfmake")).default;
//   const pdfFonts = (await import("pdfmake/build/vfs_fonts")).default;

//   pdfmake.addVirtualFileSystem(pdfFonts);

//   return pdfmake.createPdf(document);
// }
