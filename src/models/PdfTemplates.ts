import utils from "./Utils";

const servicePDF = ({ service, client, addresses, contacts, vehicle, requireList, info }:
	{ service: Service, client: Client, addresses: Address[], contacts: Contact[], vehicle: Vehicle, requireList: RequireList[], info: Info }): TDocumentDefinitions => {

	const totalPrice = requireList.reduce((acc, item) => {
		return acc + (item.price * item.quantity)
	}, 0) + service.price

	const body = (() => {
		let body: any[][] = [[]]
		let colCounter = 0;
		let bodyIndex = 0;
		if (contacts && contacts.length > 0) {
			contacts.forEach((contact) => {
				let temp = []
				let textLength = `${contact.type[0].toLocaleUpperCase() + contact.type.substring(1, contact.type.length)}: ${contact.value}`.length;
				let text = [
					{ text: `${contact.type[0].toLocaleUpperCase() + contact.type.substring(1, contact.type.length)}:`, style: "defText" },
					` ${contact.value}`
				]
				if (textLength <= 25) {
					temp = [{ text, colSpan: 1 }]
				} else if (textLength <= 60) {
					temp = [{ text, colSpan: 2 }, {}]
				} else {
					temp = [{ text, colSpan: 3 }, {}, {}]
				}
				if (temp.length + colCounter < 3) {
					body[bodyIndex].push(...temp)
					colCounter += temp.length
				} else if (temp.length + colCounter === 3) {
					body[bodyIndex].push(...temp)
					bodyIndex++
					body.push([])
					colCounter = 0
				} else if (temp.length + colCounter > 3) {
					bodyIndex++
					body.push([])
					body[bodyIndex].push(...temp)
					colCounter = temp.length
				}
			})
			body?.forEach((row, index, array) => {
				if (row.length === 0) {
					array.splice(index, 1)
				}
				while (row.length < 3) {
					row.push({})
				}
			})
		}
		return body
	})();

	const contacts_table: any = (() => {
		if (contacts && contacts.length > 0) {
			return {
				margin: [0, -0.85, 0, 0],
				table: {
					widths: ["33.33%", "33.33%", "33.34%"],
					body: body
				}
			}
		} else {
			return {}
		}
	})()

	const require_list_table: any = (() => {
		if (requireList?.length > 0) {
			return {
				margin: [0, 15, 0, 0],
				headerRows: 1,
				table: {
					widths: ["*", "auto", "auto", "auto"],
					body: [
						[
							{ text: "Produto", alignment: "center", fillColor: '#e0e0e0', bold: true },
							{ text: "Quantidade", alignment: "center", fillColor: '#e0e0e0', bold: true },
							{ text: "Preço Unitário", alignment: "center", fillColor: '#e0e0e0', bold: true },
							{ text: "Subtotal", alignment: "center", fillColor: '#e0e0e0', bold: true }
						],
						...requireList.map((item) => {
							return [
								{ text: item.name },
								{ text: item.quantity, alignment: "center" },
								{ text: utils.monetaryMask(item.price), alignment: "center" },
								{ text: utils.monetaryMask((item.price * item.quantity).toFixed(2)), alignment: "center" }
							];
						})
					]
				}
			};
		} else {
			return {};
		}
	})()

	const addresses_table: any = (() => {
		if (addresses?.length > 0) {
			return {
				margin: [0, -1, 0, 0],
				table: {
					widths: ['*'],
					body: [
						...addresses?.map((address) => {
							return [
								{
									text: [
										{ text: `Endereço:`, style: "defText" },
										` ${window.api.Address().format(address)}`
									]
								}
							]
						}),
					]
				}
			}
		} else {
			return {}
		}
	})()

	return {
		pageSize: 'A4',
		pageOrientation: 'portrait',
		pageMargins: [30, 20, 40, 30],
		content: [
			{
				text: info.name,
				style: 'header',
				margin: [0, 0, 0, 0]
			},
			{
				text: info.line_1,
				style: 'subheader',
				margin: [0, 15, 0, 0]
			},
			{
				text: info.line_2,
				style: 'subheader',
				margin: [0, 2, 0, 0]
			},
			{
				text: info.line_3,
				style: 'subheader',
				alignment: 'center',
				fontSize: 14,
				margin: [0, 2, 0, 0]
			},
			{
				text: info.line_4,
				style: 'subheader',
				margin: [0, 15, 0, 0]
			},
			{
				text: info.line_5,
				style: 'subheader',
				margin: [0, 2, 0, 10]
			},
			{
				table: {
					widths: ['*', "auto"],
					body: [
						[
							{ text: [{ text: `Ordem de Serviço:`, style: "defText" }, `  Nº${service.id}`] },
							{
								text: [{ text: `Data:`, style: "defText" }, ` ${service.date.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1")}`],
								alignment: 'center',
								margin: [10, 0, 10, 0]

							}
						],
					]
				}
			},
			{
				margin: [0, 15, 0, 0],
				table: {
					widths: ['*', "auto"],
					body: [
						[
							{
								text: [
									{ text: `Cliente:`, style: "defText" },
									` ${client.name}`
								]
							},
							{
								text: [
									{ text: `CPF/CNPJ:`, style: "defText" },
									` ${client.cpf_cnpj}`
								],
								alignment: 'center',
								margin: [0, 0, 15, 0]
							}
						],
					]
				}
			},
			contacts_table,
			addresses_table,
			{
				margin: [0, 15, 0, 0],
				table: {
					widths: ['auto', "*", '*'],
					body: [
						[
							{
								text: [
									{ text: `Placa:`, style: "defText" },
									` ${vehicle.id_plate}`
								], margin: [0, 0, 15, 0]
							},
							{
								text: [
									{ text: `Marca:`, style: "defText" },
									` ${vehicle.brand}`
								]
							},
							{
								text: [
									{ text: `Modelo:`, style: "defText" },
									` ${vehicle.model}`
								]
							}
						],
						[
							{
								text: [
									{ text: `Cor:`, style: "defText" },
									` ${vehicle.color}`
								]
							},
							{
								text: [
									{ text: `Ano:`, style: "defText" },
									` ${vehicle.year}`
								]
							},
							{
								text: [
									{ text: `KM:`, style: "defText" },
									` ${vehicle.km}`
								]
							},
						],
					]
				}
			},
			{
				margin: [0, 15, 0, 0],
				table: {
					widths: ['*'],
					body: [
						[
							{ text: `Serviço`, alignment: "center", bold: true, fillColor: '#e0e0e0' }
						], [
							{ text: service.description, margin: [0, 3, 0, 3] }
						],
						[
							{
								text: [
									{ text: `Preço do Serviço:`, style: "defText" },
									`${utils.monetaryMask(service.price)}`]
							}
						],
					]
				}
			},
			require_list_table,
			{
				margin: [0, 15, 0, 0],
				table: {
					widths: ['auto', "*"],
					body: [
						[
							{ text: `Garantia do serviço: ${service.warranty} meses. Peças conforme fabricante.` },
							{
								text: [
									{ text: `Total:`, style: "defText" },
									` ${utils.monetaryMask(totalPrice)}`
								]
							}
						],
						[
							{
								text: `Assinatura:  ____________________________________________`,
								fillColor: '#f0f0f0',
								margin: [0, 15, 0, 0]
							},
							{
								text: `Obrigado pela preferência!`,
								margin: [0, 15, 0, 0]
							}
						],
					]

				}
			}
		],
		defaultStyle: {
			font: 'Helvetica',
		},
		styles: {
			header: {
				alignment: 'center',
				fontSize: 18,
				bold: true
			},
			subheader: {
				fontSize: 14,
				italics: true,
				alignment: 'center',
			},
			defText: {
				bold: true
			}
		},
	};
};
const pdfTemplate = { servicePDF }
export default pdfTemplate;