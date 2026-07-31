import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { PackingMaterialTransaction } from "@/features/packing-material-transactions/packing-material-transactions";
import type { PackingMaterialTransactionItem } from "@/features/packing-material-transaction-items/packing-material-transaction-items";

const INK = "#141414";
const MUTED = "#6E6E6E";
const ACCENT = "#B3261E";
const RULE = "#141414";
const SOFT_RULE = "#BDBDBD";

const TRANSACTION_TITLES: Record<number, string> = {
    1: "Salida de bodega empaque",
    2: "Ingreso a bodega empaque"
};

const styles = StyleSheet.create({
    page: {
        paddingHorizontal: 40,
        paddingTop: 36,
        paddingBottom: 48,
        fontFamily: "Helvetica",
        fontSize: 9,
        color: INK
    },

    header: {
        flexDirection: "row",
        alignItems: "flex-start"
    },
    headerSide: {
        width: 120
    },
    wordmark: {
        fontFamily: "Helvetica-Bold",
        fontSize: 15,
        letterSpacing: 3
    },
    wordmarkSub: {
        marginTop: 3,
        fontSize: 6.5,
        letterSpacing: 1.4,
        color: MUTED
    },
    headerCenter: {
        flex: 1,
        alignItems: "center"
    },
    documentTitle: {
        fontFamily: "Helvetica-Bold",
        fontSize: 16,
        letterSpacing: 1.2,
        textAlign: "center",
        textTransform: "uppercase"
    },
    folio: {
        marginTop: 8,
        fontFamily: "Helvetica-Bold",
        fontSize: 9,
        letterSpacing: 0.6,
        color: ACCENT
    },
    reference: {
        marginTop: 2,
        fontSize: 9,
        letterSpacing: 0.6,
        color: ACCENT
    },

    meta: {
        marginTop: 28,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
    company: {
        width: 240
    },
    companyName: {
        fontFamily: "Helvetica-Bold",
        fontSize: 9,
        letterSpacing: 0.5,
        textTransform: "uppercase"
    },
    companyLine: {
        marginTop: 2.5,
        fontSize: 8,
        color: MUTED,
        textTransform: "uppercase"
    },
    stamp: {
        borderWidth: 0.75,
        borderColor: RULE,
        width: 150
    },
    stampCode: {
        fontFamily: "Helvetica-Bold",
        fontSize: 9,
        letterSpacing: 1,
        textAlign: "center",
        paddingVertical: 4,
        borderBottomWidth: 0.75,
        borderBottomColor: RULE
    },
    stampRow: {
        flexDirection: "row"
    },
    stampLabel: {
        width: 52,
        fontFamily: "Helvetica-Bold",
        fontSize: 7.5,
        letterSpacing: 0.8,
        textTransform: "uppercase",
        paddingVertical: 5,
        paddingHorizontal: 6,
        borderRightWidth: 0.75,
        borderRightColor: RULE
    },
    stampValue: {
        flex: 1,
        fontSize: 8.5,
        paddingVertical: 5,
        paddingHorizontal: 6
    },

    details: {
        marginTop: 22,
        paddingTop: 10,
        borderTopWidth: 0.75,
        borderTopColor: RULE,
        flexDirection: "row",
        gap: 28
    },
    detail: {
        flex: 1
    },
    detailLabel: {
        fontSize: 6.5,
        letterSpacing: 1.2,
        textTransform: "uppercase",
        color: MUTED
    },
    detailValue: {
        marginTop: 3,
        fontFamily: "Helvetica-Bold",
        fontSize: 9.5
    },

    items: {
        marginTop: 26
    },
    itemsHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
    itemsCount: {
        fontSize: 6.5,
        letterSpacing: 1.2,
        textTransform: "uppercase",
        color: MUTED
    },
    table: {
        marginTop: 8
    },
    tableHead: {
        flexDirection: "row",
        paddingBottom: 5,
        borderBottomWidth: 0.75,
        borderBottomColor: RULE
    },
    tableRow: {
        flexDirection: "row",
        paddingVertical: 6,
        borderBottomWidth: 0.5,
        borderBottomColor: SOFT_RULE
    },
    tableTotal: {
        flexDirection: "row",
        paddingTop: 6,
        borderTopWidth: 0.75,
        borderTopColor: RULE
    },
    headCell: {
        fontSize: 6.5,
        letterSpacing: 1.2,
        textTransform: "uppercase",
        color: MUTED
    },
    cell: {
        fontSize: 8.5
    },
    colIndex: {
        width: 22
    },
    colCode: {
        width: 68,
        fontFamily: "Helvetica-Bold"
    },
    colName: {
        flex: 1,
        paddingRight: 10
    },
    colLote: {
        width: 80
    },
    colDestination: {
        width: 96,
        paddingRight: 10
    },
    colQuantity: {
        width: 54,
        textAlign: "right",
        fontFamily: "Helvetica-Bold"
    },
    totalLabel: {
        flex: 1,
        fontFamily: "Helvetica-Bold",
        fontSize: 7.5,
        letterSpacing: 1.2,
        textTransform: "uppercase",
        textAlign: "right",
        paddingRight: 10
    },
    totalValue: {
        width: 54,
        textAlign: "right",
        fontFamily: "Helvetica-Bold",
        fontSize: 9.5
    },
    empty: {
        marginTop: 10,
        paddingBottom: 10,
        fontSize: 8.5,
        color: MUTED,
        borderBottomWidth: 0.75,
        borderBottomColor: RULE
    },

    observations: {
        marginTop: 30
    },
    sectionLabel: {
        fontFamily: "Helvetica-Bold",
        fontSize: 8,
        letterSpacing: 1.2,
        textTransform: "uppercase"
    },
    observationsBody: {
        marginTop: 6,
        minHeight: 56,
        paddingBottom: 6,
        paddingHorizontal: 2,
        borderBottomWidth: 0.75,
        borderBottomColor: RULE,
        fontSize: 9,
        lineHeight: 1.5
    },
    observationsEmpty: {
        color: MUTED
    },

    signatures: {
        marginTop: 46,
        flexDirection: "row",
        gap: 44
    },
    signature: {
        flex: 1
    },
    signatureRole: {
        fontSize: 6.5,
        letterSpacing: 1.2,
        textTransform: "uppercase",
        color: MUTED
    },
    signatureName: {
        marginTop: 3,
        fontFamily: "Helvetica-Bold",
        fontSize: 10,
        textTransform: "capitalize"
    },
    signatureSlot: {
        marginTop: 10,
        height: 58,
        alignItems: "center",
        justifyContent: "flex-end",
        borderBottomWidth: 0.75,
        borderBottomColor: RULE
    },
    signatureImage: {
        maxHeight: 52,
        objectFit: "contain"
    },
    signatureCaption: {
        marginTop: 5,
        fontSize: 7,
        letterSpacing: 1.2,
        textTransform: "uppercase",
        textAlign: "center",
        color: MUTED
    },

    footer: {
        position: "absolute",
        left: 40,
        right: 40,
        bottom: 24,
        paddingTop: 6,
        borderTopWidth: 0.5,
        borderTopColor: SOFT_RULE,
        flexDirection: "row",
        justifyContent: "space-between",
        fontSize: 6.5,
        letterSpacing: 0.8,
        textTransform: "uppercase",
        color: MUTED
    }
});

const bucketUrl = import.meta.env.VITE_AWS_BUCKET_URL;

const signatureUrl = (path: string) => path ? `${bucketUrl}/${path}` : null;

const quantityFormatter = new Intl.NumberFormat("es-GT", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
});

const emissionDate = () => new Intl.DateTimeFormat("es-GT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
}).format(new Date());

type SignatureProps = {
    role: string;
    name: string;
    signature: string;
}

function SignatureBlock({ role, name, signature }: SignatureProps) {
    const url = signatureUrl(signature);

    return (
        <View style={styles.signature}>
            <Text style={styles.signatureRole}>{role}</Text>
            <Text style={styles.signatureName}>{name}</Text>
            <View style={styles.signatureSlot}>
                {url && <Image src={url} style={styles.signatureImage} />}
            </View>
            <Text style={styles.signatureCaption}>Firma</Text>
        </View>
    )
}

type Props = {
    transaction: PackingMaterialTransaction;
    items?: PackingMaterialTransactionItem[];
}

export function PackingMaterialTransactionDocument({ transaction, items = [] }: Props) {
    const title = TRANSACTION_TITLES[transaction.type] ?? "Movimiento de bodega empaque";
    const date = emissionDate();
    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <Document
            title={`Boleta ${transaction.reference}`}
            author="Agroindustria Legumex, S.A."
        >
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <View style={styles.headerSide}>
                        <Text style={styles.wordmark}>LEGUMEX</Text>
                        <Text style={styles.wordmarkSub}>AGROINDUSTRIA</Text>
                    </View>

                    <View style={styles.headerCenter}>
                        <Text style={styles.documentTitle}>{title}</Text>
                        <Text style={styles.folio}>No. {transaction.id}</Text>
                        <Text style={styles.reference}>Referencia: {transaction.reference}</Text>
                    </View>

                    <View style={styles.headerSide} />
                </View>

                <View style={styles.meta}>
                    <View style={styles.company}>
                        <Text style={styles.companyName}>Agroindustria Legumex, S.A.</Text>
                        <Text style={styles.companyLine}>12 avenida 6-15 zona 2 sector</Text>
                        <Text style={styles.companyLine}>Las Majadas, El Tejar, Chimaltenango</Text>
                        <Text style={styles.companyLine}>PBX: 7824 9300</Text>
                    </View>

                    <View style={styles.stamp}>
                        <Text style={styles.stampCode}>R.PRO.BOD.06</Text>
                        <View style={styles.stampRow}>
                            <Text style={styles.stampLabel}>Fecha</Text>
                            <Text style={styles.stampValue}>{date}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.details}>
                    <View style={styles.detail}>
                        <Text style={styles.detailLabel}>Encargado de bodega</Text>
                        <Text style={styles.detailValue}>{transaction.user_name}</Text>
                    </View>
                    <View style={styles.detail}>
                        <Text style={styles.detailLabel}>Responsable</Text>
                        <Text style={styles.detailValue}>{transaction.responsable}</Text>
                    </View>
                    <View style={styles.detail}>
                        <Text style={styles.detailLabel}>Tarea del plan semanal</Text>
                        <Text style={styles.detailValue}>No. {transaction.weekly_plan_task_id}</Text>
                    </View>
                </View>

                <View style={styles.items}>
                    <View style={styles.itemsHeader}>
                        <Text style={styles.sectionLabel}>Materiales</Text>
                        <Text style={styles.itemsCount}>
                            {items.length === 1 ? "1 renglón" : `${items.length} renglones`}
                        </Text>
                    </View>

                    {items.length === 0 ? (
                        <Text style={styles.empty}>La transacción no tiene materiales registrados</Text>
                    ) : (
                        <View style={styles.table}>
                            <View style={styles.tableHead} fixed>
                                <Text style={[styles.headCell, styles.colIndex]}>No.</Text>
                                <Text style={[styles.headCell, styles.colCode]}>Código</Text>
                                <Text style={[styles.headCell, styles.colName]}>Material</Text>
                                <Text style={[styles.headCell, styles.colLote]}>Lote</Text>
                                <Text style={[styles.headCell, styles.colDestination]}>Destino</Text>
                                <Text style={[styles.headCell, styles.colQuantity]}>Cantidad</Text>
                            </View>

                            {items.map((item, index) => (
                                <View key={item.id} style={styles.tableRow} wrap={false}>
                                    <Text style={[styles.cell, styles.colIndex]}>{index + 1}</Text>
                                    <Text style={[styles.cell, styles.colCode]}>{item.packing_material_code || "—"}</Text>
                                    <Text style={[styles.cell, styles.colName]}>{item.packing_material_name || "—"}</Text>
                                    <Text style={[styles.cell, styles.colLote]}>{item.lote || "—"}</Text>
                                    <Text style={[styles.cell, styles.colDestination]}>{item.destination || "—"}</Text>
                                    <Text style={[styles.cell, styles.colQuantity]}>{quantityFormatter.format(item.quantity)}</Text>
                                </View>
                            ))}

                            <View style={styles.tableTotal}>
                                <Text style={styles.totalLabel}>Total</Text>
                                <Text style={styles.totalValue}>{quantityFormatter.format(totalQuantity)}</Text>
                            </View>
                        </View>
                    )}
                </View>

                <View style={styles.observations}>
                    <Text style={styles.sectionLabel}>Observaciones</Text>
                    <Text style={[styles.observationsBody, ...(transaction.observations ? [] : [styles.observationsEmpty])]}>
                        {transaction.observations || "Sin observaciones"}
                    </Text>
                </View>

                <View style={styles.signatures}>
                    <SignatureBlock
                        role="Encargado de bodega"
                        name={transaction.user_name}
                        signature={transaction.user_signature}
                    />
                    <SignatureBlock
                        role="Responsable"
                        name={transaction.responsable}
                        signature={transaction.responsable_signature}
                    />
                </View>

                <View style={styles.footer} fixed>
                    <Text>Agroindustria Legumex, S.A. · R.PRO.BOD.06</Text>
                    <Text render={({ pageNumber, totalPages }) => `Página ${pageNumber} de ${totalPages}`} />
                </View>
            </Page>
        </Document>
    )
}
