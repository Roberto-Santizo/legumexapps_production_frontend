import { CustomFilledButton, CustomForm, getQueryParam, handleDeleteQueryParam, Loading, Modal, queryParamExists } from "@/features/shared/shared";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PackingMaterialItemByTaskComponent, weeklyPlanTaskProvider } from "@/features/weekly-plan-tasks/weekly-plan-tasks";

const signatures = [
    { name: "responsable_signature", label: "Firma del Responsable" },
    { name: "user_signature", label: "Firma de Bodega" }
];

export function ModalPackingMaterialItemsByTask() {
    const location = useLocation();
    const navigate = useNavigate();
    const taskId = getQueryParam(location, 'taskId');
    const show = queryParamExists(location, 'taskId');

    const { data, isLoading } = useQuery({
        queryKey: ['getPackingMaterialItemsByTaskId', taskId],
        queryFn: () => weeklyPlanTaskProvider.getPackingMaterialItemsByTaskId(taskId!),
        enabled: !!taskId
    });

    const closeModal = () => {
        handleDeleteQueryParam(location, navigate, 'taskId');
    }

    return (
        <Modal closeModal={() => closeModal()} modal={show} title="Entrega Material de Empaque" width="sm:max-w-4xl">
            {isLoading && <Loading />}

            {data && (
                <CustomForm onSubmit={(e) => e.preventDefault()} className="border-none p-0 shadow-none">
                    <section className="flex flex-col gap-4">
                        <h3 className="border-b border-gray-200 pb-2 text-sm font-semibold text-gray-900">
                            Datos de la Entrega
                        </h3>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700" htmlFor="reference">
                                    Referencia
                                </label>

                                <input
                                    id="reference"
                                    name="reference"
                                    type="text"
                                    placeholder="REQ-00123"
                                    autoComplete="off"
                                    className="text_form_field"
                                />

                                <p className="text-red-400 text-xs"></p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700" htmlFor="responsable">
                                    Responsable
                                </label>

                                <input
                                    id="responsable"
                                    name="responsable"
                                    type="text"
                                    placeholder="Nombre de quien recibe"
                                    autoComplete="off"
                                    className="text_form_field"
                                />

                                <p className="text-red-400 text-xs"></p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700" htmlFor="type">
                                    Tipo de Movimiento
                                </label>

                                <select id="type" name="type" className="text_form_field" defaultValue={1}>
                                    <option value={1}>Salida</option>
                                    <option value={2}>Entrada</option>
                                </select>

                                <p className="text-red-400 text-xs"></p>
                            </div>

                            <div className="flex flex-col gap-2 sm:col-span-2">
                                <label className="text-sm font-medium text-gray-700" htmlFor="observations">
                                    Observaciones
                                </label>

                                <textarea
                                    id="observations"
                                    name="observations"
                                    rows={3}
                                    placeholder="Entrega parcial, material dañado, etc."
                                    className="text_form_field resize-none"
                                />

                                <p className="text-red-400 text-xs"></p>
                            </div>
                        </div>
                    </section>

                    <section className="flex flex-col gap-4">
                        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                            <h3 className="text-sm font-semibold text-gray-900">
                                Materiales a Entregar
                            </h3>

                            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                                {data.length} materiales
                            </span>
                        </div>

                        <div className="space-y-3">
                            {data.length === 0 && (
                                <p className="text-center font-light">La tarea no tiene materiales de empaque asignados</p>
                            )}

                            {data.map((item, index) => (
                                <PackingMaterialItemByTaskComponent
                                    key={item.packing_material_id}
                                    item={item}
                                    index={index}
                                />
                            ))}
                        </div>
                    </section>

                    <section className="flex flex-col gap-4">
                        <h3 className="border-b border-gray-200 pb-2 text-sm font-semibold text-gray-900">
                            Firmas
                        </h3>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {signatures.map(signature => (
                                <div key={signature.name} className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        {signature.label}
                                    </label>

                                    <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 text-xs text-gray-500">
                                        Toque para firmar
                                    </div>

                                    <p className="text-red-400 text-xs"></p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <CustomFilledButton
                        type="submit"
                        label="Registrar Entrega"
                        disabled={data.length === 0}
                        fullWitdh
                    />
                </CustomForm>
            )}
        </Modal>
    )
}
