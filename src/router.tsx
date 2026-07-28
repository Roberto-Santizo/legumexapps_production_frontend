import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CalendarWeeklyPlan, CreateWeeklyPlan, IndexWeeklyPlans, ShowWeeklyPlan, UpdateWeeklyPlan } from "@/features/weekly-plans/weekly-plans";
import { CreateClient, IndexClients, ShowClient, UpdateClient } from "@/features/clients/clients";
import { CreateLine, IndexLines, ShowLine, UpdateLine } from "@/features/lines/lines";
import { CreatePackingMaterial, IndexPackingMaterials, ShowPackingMaterial, UpdatePackingMaterial } from "@/features/packing-materials/packing-materials";
import { CreatePerformance, IndexPerformances, ShowPerformance, UpdatePerformance } from "@/features/performances/performances";
import { CreatePosition, IndexPositions, ShowPosition, UpdatePosition } from "@/features/positions/positions";
import { CreateRawMaterial, IndexRawMaterials, ShowRawMaterial, UpdateRawMaterial } from "@/features/raw-materials/raw-materials";
import { CreateSku, IndexSkus, ShowSku, UpdateSku } from "@/features/skus/skus";
import { CreateTimeout, IndexTimeouts, ShowTimeout, UpdateTimeout } from "@/features/timeouts/timeouts";
import { Dashboard } from "@/features/dashboard/Dashboard";
import { Login } from "@/features/auth/auth";
import { NotFound, ProtectedLayout, PublicLayout } from "@/features/shared/shared";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PublicLayout />}>
                    <Route path="*" element={<NotFound />} />
                </Route>

                <Route element={<PublicLayout />}>
                    <Route path="/" element={<Navigate to={'/login'} replace />} />
                    <Route path="/login" element={<Login />} />
                </Route>

                <Route element={<ProtectedLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>

                <Route element={<ProtectedLayout />}>
                    <Route path="/lineas" element={<IndexLines />} />
                    <Route path="/lineas/crear" element={<CreateLine />} />
                    <Route path="/lineas/:id/editar" element={<UpdateLine />} />
                    <Route path="/lineas/:id" element={<ShowLine />} />
                </Route>

                <Route element={<ProtectedLayout />}>
                    <Route path="/posiciones" element={<IndexPositions />} />
                    <Route path="/posiciones/crear" element={<CreatePosition />} />
                    <Route path="/posiciones/:id/editar" element={<UpdatePosition />} />
                    <Route path="/posiciones/:id" element={<ShowPosition />} />
                </Route>

                <Route element={<ProtectedLayout />}>
                    <Route path="/skus" element={<IndexSkus />} />
                    <Route path="/skus/crear" element={<CreateSku />} />
                    <Route path="/skus/:id/editar" element={<UpdateSku />} />
                    <Route path="/skus/:id" element={<ShowSku />} />
                </Route>

                <Route element={<ProtectedLayout />}>
                    <Route path="/items-material-empaque" element={<IndexPackingMaterials />} />
                    <Route path="/items-material-empaque/crear" element={<CreatePackingMaterial />} />
                    <Route path="/items-material-empaque/:id/editar" element={<UpdatePackingMaterial />} />
                    <Route path="/items-material-empaque/:id" element={<ShowPackingMaterial />} />
                </Route>

                <Route element={<ProtectedLayout />}>
                    <Route path="/items-materia-prima" element={<IndexRawMaterials />} />
                    <Route path="/items-materia-prima/crear" element={<CreateRawMaterial />} />
                    <Route path="/items-materia-prima/:id/editar" element={<UpdateRawMaterial />} />
                    <Route path="/items-materia-prima/:id" element={<ShowRawMaterial />} />
                </Route>

                <Route element={<ProtectedLayout />}>
                    <Route path="/tiempos-muertos" element={<IndexTimeouts />} />
                    <Route path="/tiempos-muertos/crear" element={<CreateTimeout />} />
                    <Route path="/tiempos-muertos/:id/editar" element={<UpdateTimeout />} />
                    <Route path="/tiempos-muertos/:id" element={<ShowTimeout />} />
                </Route>

                <Route element={<ProtectedLayout />}>
                    <Route path="/clientes" element={<IndexClients />} />
                    <Route path="/clientes/crear" element={<CreateClient />} />
                    <Route path="/clientes/:id/editar" element={<UpdateClient />} />
                    <Route path="/clientes/:id" element={<ShowClient />} />
                </Route>

                 <Route element={<ProtectedLayout />}>
                    <Route path="/rendimientos" element={<IndexPerformances />} />
                    <Route path="/rendimientos/crear" element={<CreatePerformance />} />
                    <Route path="/rendimientos/:id/editar" element={<UpdatePerformance />} />
                    <Route path="/rendimientos/:id" element={<ShowPerformance />} />
                </Route>

                  <Route element={<ProtectedLayout />}>
                    <Route path="/planes-semanales" element={<IndexWeeklyPlans />} />
                    <Route path="/planes-semanales/calendario/:id" element={<CalendarWeeklyPlan />} />
                    <Route path="/planes-semanales/crear" element={<CreateWeeklyPlan />} />
                    <Route path="/planes-semanales/:id/editar" element={<UpdateWeeklyPlan />} />
                    <Route path="/planes-semanales/:id" element={<ShowWeeklyPlan />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
