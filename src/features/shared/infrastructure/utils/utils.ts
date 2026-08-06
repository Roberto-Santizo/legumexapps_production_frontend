import { saveAs } from "file-saver";
import { type Location, type NavigateFunction } from "react-router-dom";
import ExcelJS from "exceljs";
import type { ExportExcelOptions } from "@/features/shared/shared";

export const getQueryParam = (location: Location<any>, queryParam: string) => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get(queryParam);
}

export const queryParamExists = (location: Location<any>, queryParam: string, value?: string): boolean => {
    const queryParams = new URLSearchParams(location.search);
    const show = value ? queryParams.get(queryParam) == value : !!queryParams.get(queryParam);
    return show;
}

export const handleSetQueryParam = (location: Location<any>, navigate: NavigateFunction, queryParam: string, value: string) => {
    const params = new URLSearchParams(location.search);
    params.set(queryParam, value);
    navigate({ pathname: location.pathname, search: params.toString() });
};

export const handleDeleteQueryParam = (location: Location<any>, navigate: NavigateFunction, queryParam: string) => {
    const params = new URLSearchParams(location.search);
    params.delete(queryParam);

    navigate({ pathname: location.pathname, search: params.toString() });
};

export const setQueryParams = <T extends Record<string, unknown>>(filters: T) => {
    const params = new URLSearchParams(Object.entries(filters).filter(([, value]) => value != null && value !== '').map(([key, value]) => [key, String(value)]));
    return params;
}

export const formatDateValue = (date: Date): string => {
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');

    return `${date.getFullYear()}-${month}-${day}`;
}

export const getCurrentDate = (): string => formatDateValue(new Date());

export const parseDateValue = (value: string): Date => {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day);
}

export const getIsoWeekDates = (week: number, year: number): string[] => {
    const january4th = new Date(year, 0, 4);
    const weekDayOffset = (january4th.getDay() + 6) % 7;
    const monday = new Date(year, 0, 4 - weekDayOffset + (week - 1) * 7);

    return Array.from({ length: 7 }, (_, index) => formatDateValue(new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + index)));
}

export function downloadBase64File(base64: string, filename: string) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export async function exportToExcel<T>({ fileName, sheetName, columns, data }: ExportExcelOptions<T>) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    worksheet.columns = columns.map(column => ({
        header: column.header,
        key: column.key as string,
        width: column.width ?? 20,
    }));

    worksheet.addRows(data);

    const buffer = await workbook.xlsx.writeBuffer();

    saveAs(new Blob([buffer]), `${fileName}.xlsx`);
}