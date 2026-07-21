import { LinesDatasourceImpl, LinesRepositoryImpl } from "@/features/lines/infrastructure/infrastructure";
import { LinesProvider } from "./LinesProvider";
import api from "@/config/http/axios";

const datasource = new LinesDatasourceImpl(api);
const repository = new LinesRepositoryImpl(datasource);
export const linesRepositoryProvider = new LinesProvider(repository);