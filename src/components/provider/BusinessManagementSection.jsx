import { useEffect, useMemo, useState } from 'react';

const normalizeDriveImageUrl = (url) => {
  if (!url) return '';

  const trimmed = String(url).trim();

  if (!trimmed) return '';

  if (trimmed.includes('drive.google.com/file/d/')) {
    const match = trimmed.match(/\/file\/d\/([^/]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
  }

  return trimmed;
};

const defaultMenuForm = {
  id: '',
  name: '',
  description: '',
  eventType: 'Boda',
  pricingModel: 'Por persona',
  price: '',
  minGuests: '',
  maxGuests: '',
  startersText: '',
  mainsText: '',
  dessertsText: '',
  drinksText: '',
  restrictions: [],
  services: []
};

const normalizeList = (value) =>
  String(value ?? '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);

const formatCurrency = (value) =>
  new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    maximumFractionDigits: 0
  }).format(Number(value || 0));

const createMenuPayload = (form) => ({
  id: form.id || `menu-${Date.now()}`,
  name: form.name.trim(),
  description: form.description.trim(),
  eventType: form.eventType,
  pricingModel: form.pricingModel,
  price: Number(form.price),
  minGuests: Number(form.minGuests),
  maxGuests: Number(form.maxGuests),
  starters: normalizeList(form.startersText),
  mains: normalizeList(form.mainsText),
  desserts: normalizeList(form.dessertsText),
  drinks: normalizeList(form.drinksText),
  restrictions: form.restrictions,
  services: form.services
});

const BusinessManagementSection = ({
  business,
  menus,
  onBusinessSave,
  onPortfolioChange,
  onMenusChange
}) => {
  const [localBusiness, setLocalBusiness] = useState(business || {});
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [menuForm, setMenuForm] = useState(defaultMenuForm);
  const [menuError, setMenuError] = useState('');
  const [businessError, setBusinessError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setLocalBusiness(business || {});
  }, [business]);

  const eventOptions = useMemo(
    () => ['Boda', 'Corporativo', 'Cumpleaños', 'Bautizo', 'Conferencia'],
    []
  );

  const specialtyOptions = useMemo(
    () => [
      'Cocina costarricense',
      'Buffet',
      'Repostería',
      'Gourmet',
      'Catering ejecutivo'
    ],
    []
  );

  const restrictionOptions = useMemo(
    () => ['Vegetariano', 'Vegano', 'Sin gluten', 'Sin lactosa', 'Sin frutos secos'],
    []
  );

  const serviceOptions = useMemo(
    () => ['Vajilla', 'Utilería', 'Meseros', 'Bartender', 'Montaje', 'Decoración'],
    []
  );

  const handleBusinessFieldChange = (field, value) => {
    setLocalBusiness((prev) => ({ ...prev, [field]: value }));
  };

  const handleBusinessSave = () => {
    setBusinessError('');

    if (
      !localBusiness.name?.trim() ||
      !localBusiness.description?.trim() ||
      !localBusiness.location?.trim() ||
      !localBusiness.phone?.trim() ||
      !localBusiness.email?.trim()
    ) {
      setBusinessError('Nombre, descripción, ubicación, teléfono y correo son obligatorios.');
      return;
    }

    if (Number(localBusiness.minCapacity) <= 0) {
      setBusinessError('La capacidad mínima debe ser mayor que cero.');
      return;
    }

    if (Number(localBusiness.maxCapacity) < Number(localBusiness.minCapacity)) {
      setBusinessError('La capacidad máxima no puede ser menor que la mínima.');
      return;
    }

    onBusinessSave(localBusiness);
    setSuccessMessage('Información comercial guardada correctamente.');
  };

  const addPortfolioImage = () => {
    if (!portfolioUrl.trim()) {
      setSuccessMessage('Debes agregar una URL.');
      return;
    }

    const normalizedUrl = normalizeDriveImageUrl(portfolioUrl);

    if (!normalizedUrl) {
      setSuccessMessage('La URL no es válida.');
      return;
    }

    const currentPortfolio = Array.isArray(localBusiness.portfolio) ? localBusiness.portfolio : [];

    if (currentPortfolio.includes(normalizedUrl)) {
      setSuccessMessage('La URL ya existe en el portafolio.');
      return;
    }

    const updatedPortfolio = [...currentPortfolio, normalizedUrl];
    setLocalBusiness((prev) => ({ ...prev, portfolio: updatedPortfolio }));
    onPortfolioChange(updatedPortfolio);
    setPortfolioUrl('');
    setSuccessMessage('Imagen agregada al portafolio.');
  };

  const removePortfolioImage = (imageUrl) => {
    const currentPortfolio = Array.isArray(localBusiness.portfolio) ? localBusiness.portfolio : [];
    const updatedPortfolio = currentPortfolio.filter((item) => item !== imageUrl);
    const shouldClearPresentation = localBusiness.presentationImage === imageUrl;
    const updatedBusiness = {
      ...localBusiness,
      portfolio: updatedPortfolio,
      presentationImage: shouldClearPresentation ? '' : localBusiness.presentationImage
    };

    setLocalBusiness(updatedBusiness);
    onPortfolioChange(updatedPortfolio);
    if (shouldClearPresentation) {
      onBusinessSave(updatedBusiness);
    }
    setSuccessMessage('Imagen eliminada del portafolio.');
  };

  const handleSetPresentationImage = (image) => {
    const updatedBusiness = { ...localBusiness, presentationImage: image };
    setLocalBusiness(updatedBusiness);
    onBusinessSave(updatedBusiness);
    setSuccessMessage('Imagen de presentación actualizada.');
  };

  const updateCheckboxGroup = (field, value, checked) => {
    setMenuForm((prev) => {
      const current = new Set(prev[field] || []);
      if (checked) current.add(value);
      else current.delete(value);

      return { ...prev, [field]: Array.from(current) };
    });
  };

  const resetMenuForm = () => {
    setMenuForm(defaultMenuForm);
    setMenuError('');
  };

  const handleMenuSave = () => {
    setMenuError('');

    if (!menuForm.name?.trim() || !menuForm.description?.trim() || !menuForm.eventType) {
      setMenuError('Nombre, descripción y tipo de evento son obligatorios.');
      return;
    }

    if (Number(menuForm.price) <= 0) {
      setMenuError('El precio debe ser un número mayor que cero.');
      return;
    }

    if (Number(menuForm.minGuests) <= 0) {
      setMenuError('El mínimo de asistentes debe ser mayor que cero.');
      return;
    }

    if (Number(menuForm.maxGuests) < Number(menuForm.minGuests)) {
      setMenuError('El máximo de asistentes no puede ser menor que el mínimo.');
      return;
    }

    const newMenu = createMenuPayload(menuForm);

    const updatedMenus = menuForm.id
      ? menus.map((item) => (item.id === menuForm.id ? newMenu : item))
      : [newMenu, ...menus];

    onMenusChange(updatedMenus);
    setSuccessMessage(
      menuForm.id ? 'Paquete actualizado correctamente.' : 'Paquete creado correctamente.'
    );
    resetMenuForm();
  };

  const editMenu = (selectedMenu) => {
    setMenuForm({
      ...defaultMenuForm,
      id: selectedMenu.id,
      name: selectedMenu.name,
      description: selectedMenu.description,
      eventType: selectedMenu.eventType,
      pricingModel: selectedMenu.pricingModel,
      price: selectedMenu.price,
      minGuests: selectedMenu.minGuests,
      maxGuests: selectedMenu.maxGuests,
      startersText: (selectedMenu.starters || []).join('\n'),
      mainsText: (selectedMenu.mains || []).join('\n'),
      dessertsText: (selectedMenu.desserts || []).join('\n'),
      drinksText: (selectedMenu.drinks || []).join('\n'),
      restrictions: selectedMenu.restrictions || [],
      services: selectedMenu.services || []
    });
  };

  const deleteMenu = (menuId) => {
    const confirmDelete = window.confirm('¿Deseas eliminar este paquete?');
    if (!confirmDelete) return;

    const updatedMenus = menus.filter((menu) => menu.id !== menuId);
    onMenusChange(updatedMenus);
    setSuccessMessage('Paquete eliminado.');
    if (menuForm.id === menuId) resetMenuForm();
  };

  const portfolioImages = Array.isArray(localBusiness.portfolio) ? localBusiness.portfolio : [];

  return (
    <section className="provider-section">
      <div className="provider-section-header">
        <div>
          <p className="provider-section-label">Etapa 1</p>
          <h2>
            {localBusiness.name
              ? `Gestión del comercio · ${localBusiness.name}`
              : 'Gestión del comercio'}
          </h2>
        </div>
      </div>

      {successMessage && <div className="provider-alert success">{successMessage}</div>}

      <div className="provider-grid two-columns">
        <div className="provider-panel">
          <h3>Perfil comercial</h3>

          {businessError && <div className="provider-alert error">{businessError}</div>}

          <div className="provider-form-grid">
            <label>
              Nombre comercial
              <input
                value={localBusiness.name || ''}
                onChange={(e) => handleBusinessFieldChange('name', e.target.value)}
                readOnly
                disabled
              />
              <small className="field-note">
                El nombre del comercio no se modifica para conservar la verificación.
              </small>
            </label>

            <label>
              Ubicación
              <input
                value={localBusiness.location || ''}
                onChange={(e) => handleBusinessFieldChange('location', e.target.value)}
              />
            </label>

            <label>
              Teléfono
              <input
                value={localBusiness.phone || ''}
                onChange={(e) => handleBusinessFieldChange('phone', e.target.value)}
              />
            </label>

            <label>
              Correo electrónico
              <input
                type="email"
                value={localBusiness.email || ''}
                onChange={(e) => handleBusinessFieldChange('email', e.target.value)}
              />
            </label>

            <label className="full-width">
              Descripción
              <textarea
                rows="4"
                value={localBusiness.description || ''}
                onChange={(e) => handleBusinessFieldChange('description', e.target.value)}
              />
            </label>

            <label className="full-width">
              WhatsApp
              <input
                value={localBusiness.whatsapp || ''}
                onChange={(e) => handleBusinessFieldChange('whatsapp', e.target.value)}
              />
            </label>

            <label>
              Capacidad mínima
              <input
                type="number"
                min="1"
                value={localBusiness.minCapacity || ''}
                onChange={(e) => handleBusinessFieldChange('minCapacity', e.target.value)}
              />
            </label>

            <label>
              Capacidad máxima
              <input
                type="number"
                min="1"
                value={localBusiness.maxCapacity || ''}
                onChange={(e) => handleBusinessFieldChange('maxCapacity', e.target.value)}
              />
            </label>

            <label className="full-width">
              Imagen de presentación en la tarjeta
              <input
                value={localBusiness.presentationImage || ''}
                onChange={(e) =>
                  handleBusinessFieldChange(
                    'presentationImage',
                    normalizeDriveImageUrl(e.target.value)
                  )
                }
              />
              <small className="field-note">
                También puedes elegir una imagen directamente desde tu portafolio usando el botón
                "Usar como presentación".
              </small>
            </label>

            {localBusiness.presentationImage && (
              <div className="full-width preview-box">
                <img
                  src={normalizeDriveImageUrl(localBusiness.presentationImage)}
                  alt="Vista previa de presentación"
                  className="preview-image"
                />
              </div>
            )}
          </div>

          <div className="checkbox-group">
            <h4>Tipos de evento</h4>
            <div className="checkbox-list">
              {eventOptions.map((event) => (
                <label key={event}>
                  <input
                    type="checkbox"
                    checked={localBusiness.eventTypes?.includes(event)}
                    onChange={(e) =>
                      handleBusinessFieldChange(
                        'eventTypes',
                        e.target.checked
                          ? [...(localBusiness.eventTypes || []), event]
                          : (localBusiness.eventTypes || []).filter((item) => item !== event)
                      )
                    }
                  />
                  <span>{event}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="checkbox-group">
            <h4>Especialidades</h4>
            <div className="checkbox-list">
              {specialtyOptions.map((specialty) => (
                <label key={specialty}>
                  <input
                    type="checkbox"
                    checked={localBusiness.specialties?.includes(specialty)}
                    onChange={(e) =>
                      handleBusinessFieldChange(
                        'specialties',
                        e.target.checked
                          ? [...(localBusiness.specialties || []), specialty]
                          : (localBusiness.specialties || []).filter((item) => item !== specialty)
                      )
                    }
                  />
                  <span>{specialty}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="button" className="provider-primary-btn" onClick={handleBusinessSave}>
            Guardar información
          </button>
        </div>

        <div className="provider-panel">
          <h3>Portafolio visual</h3>

          <div className="provider-inline-form">
            <input
              type="text"
              placeholder="Agregar imagen por URL"
              value={portfolioUrl}
              onChange={(e) => setPortfolioUrl(e.target.value)}
            />
            <button type="button" className="provider-primary-btn" onClick={addPortfolioImage}>
              Agregar
            </button>
          </div>

          <div className="portfolio-grid">
            {portfolioImages.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className={`portfolio-item ${
                  localBusiness.presentationImage === image ? 'selected' : ''
                }`}
              >
                <img src={normalizeDriveImageUrl(image)} alt={`Portafolio ${index + 1}`} />
                {localBusiness.presentationImage === image && (
                  <span className="portfolio-item-badge">Presentación actual</span>
                )}
                <div className="portfolio-item-actions">
                  <button
                    type="button"
                    className="portfolio-set-presentation-btn"
                    disabled={localBusiness.presentationImage === image}
                    onClick={() => handleSetPresentationImage(image)}
                  >
                    {localBusiness.presentationImage === image
                      ? 'Es la presentación'
                      : 'Usar como presentación'}
                  </button>
                  <button type="button" onClick={() => removePortfolioImage(image)}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="provider-meta">
            <strong>{portfolioImages.length}</strong> imágenes en el portafolio
          </div>
        </div>
      </div>

      <div className="provider-panel">
        <h3>Menús y paquetes</h3>

        {menuError && <div className="provider-alert error">{menuError}</div>}

        <div className="provider-form-grid">
          <label>
            Nombre del paquete
            <input
              value={menuForm.name}
              onChange={(e) => setMenuForm((prev) => ({ ...prev, name: e.target.value }))}
            />
          </label>

          <label>
            Tipo de evento
            <select
              value={menuForm.eventType}
              onChange={(e) => setMenuForm((prev) => ({ ...prev, eventType: e.target.value }))}
            >
              {eventOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label>
            Modalidad de precio
            <select
              value={menuForm.pricingModel}
              onChange={(e) =>
                setMenuForm((prev) => ({ ...prev, pricingModel: e.target.value }))
              }
            >
              <option value="Por persona">Por persona</option>
              <option value="Por paquete">Por paquete</option>
              <option value="Precio orientativo">Precio orientativo</option>
            </select>
          </label>

          <label>
            Precio (CRC)
            <input
              type="number"
              min="1"
              value={menuForm.price}
              onChange={(e) => setMenuForm((prev) => ({ ...prev, price: e.target.value }))}
            />
          </label>

          <label>
            Mínimo de asistentes
            <input
              type="number"
              min="1"
              value={menuForm.minGuests}
              onChange={(e) => setMenuForm((prev) => ({ ...prev, minGuests: e.target.value }))}
            />
          </label>

          <label>
            Máximo de asistentes
            <input
              type="number"
              min="1"
              value={menuForm.maxGuests}
              onChange={(e) => setMenuForm((prev) => ({ ...prev, maxGuests: e.target.value }))}
            />
          </label>

          <label className="full-width">
            Descripción
            <textarea
              rows="3"
              value={menuForm.description}
              onChange={(e) =>
                setMenuForm((prev) => ({ ...prev, description: e.target.value }))
              }
            />
          </label>

          <label className="full-width">
            Entradas
            <textarea
              rows="3"
              value={menuForm.startersText}
              onChange={(e) =>
                setMenuForm((prev) => ({ ...prev, startersText: e.target.value }))
              }
            />
          </label>

          <label className="full-width">
            Platos fuertes
            <textarea
              rows="3"
              value={menuForm.mainsText}
              onChange={(e) =>
                setMenuForm((prev) => ({ ...prev, mainsText: e.target.value }))
              }
            />
          </label>

          <label className="full-width">
            Postres
            <textarea
              rows="3"
              value={menuForm.dessertsText}
              onChange={(e) =>
                setMenuForm((prev) => ({ ...prev, dessertsText: e.target.value }))
              }
            />
          </label>

          <label className="full-width">
            Bebidas
            <textarea
              rows="3"
              value={menuForm.drinksText}
              onChange={(e) =>
                setMenuForm((prev) => ({ ...prev, drinksText: e.target.value }))
              }
            />
          </label>
        </div>

        <div className="checkbox-group">
          <h4>Restricciones alimentarias</h4>
          <div className="checkbox-list">
            {restrictionOptions.map((option) => (
              <label key={option}>
                <input
                  type="checkbox"
                  checked={menuForm.restrictions.includes(option)}
                  onChange={(e) =>
                    updateCheckboxGroup('restrictions', option, e.target.checked)
                  }
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="checkbox-group">
          <h4>Servicios complementarios</h4>
          <div className="checkbox-list">
            {serviceOptions.map((option) => (
              <label key={option}>
                <input
                  type="checkbox"
                  checked={menuForm.services.includes(option)}
                  onChange={(e) =>
                    updateCheckboxGroup('services', option, e.target.checked)
                  }
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="provider-actions">
          <button type="button" className="provider-primary-btn" onClick={handleMenuSave}>
            {menuForm.id ? 'Actualizar paquete' : 'Guardar paquete'}
          </button>

          {menuForm.id && (
            <button type="button" className="provider-secondary-btn" onClick={resetMenuForm}>
              Cancelar edición
            </button>
          )}
        </div>

        <div className="menu-cards">
          {menus.map((menu) => (
            <article key={menu.id} className="menu-card">
              <div className="menu-card-header">
                <div>
                  <p className="menu-card-event">{menu.eventType}</p>
                  <h4>{menu.name}</h4>
                </div>
                <span>{formatCurrency(menu.price)}</span>
              </div>

              <p>{menu.description}</p>

              <div className="menu-card-meta">
                <span>{menu.pricingModel}</span>
                <span>
                  {menu.minGuests} - {menu.maxGuests} asistentes
                </span>
              </div>

              <div className="menu-tags">
                {(menu.restrictions || []).map((restriction) => (
                  <span key={restriction}>{restriction}</span>
                ))}
              </div>

              <div className="menu-card-actions">
                <button type="button" onClick={() => editMenu(menu)}>
                  Editar
                </button>
                <button type="button" className="danger" onClick={() => deleteMenu(menu.id)}>
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessManagementSection;