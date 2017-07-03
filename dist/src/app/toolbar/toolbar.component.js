var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ToolbarConfig } from './toolbar-config';
import { cloneDeep, defaults, find, isEqual, remove } from 'lodash';
/**
 * Toolbar component
 */
var ToolbarComponent = (function () {
    /**
     * The default constructor
     */
    function ToolbarComponent() {
        /**
         * The event emitted when an action (e.g., button, kebab, etc.) has been selected
         */
        this.onActionSelect = new EventEmitter();
        /**
         * The event emitted when a field menu option is selected
         */
        this.onFilterFiledSelect = new EventEmitter();
        /**
         * The event emitted when a filter has been changed
         */
        this.onFilterChange = new EventEmitter();
        /**
         * The event emitted when the user types ahead in the query input field
         */
        this.onFilterTypeAhead = new EventEmitter();
        /**
         * The event emitted when the sort has changed
         */
        this.onSortChange = new EventEmitter();
        /**
         * The event emitted when a view has been selected
         */
        this.onViewSelect = new EventEmitter();
        this.defaultConfig = {};
    }
    // Initialization
    /**
     *  Setup component configuration upon initialization
     */
    ToolbarComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    /**
     *  Check if the component config has changed
     */
    ToolbarComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    ToolbarComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        if (this.config && this.config.filterConfig
            && this.config.filterConfig.appliedFilters === undefined) {
            this.config.filterConfig.appliedFilters = [];
        }
        if (this.config && this.config.sortConfig && this.config.sortConfig.fields === undefined) {
            this.config.sortConfig.fields = [];
        }
        if (this.config.sortConfig !== undefined && this.config.sortConfig.visible === undefined) {
            this.config.sortConfig.visible = true;
        }
        if (this.config && this.config.viewConfig && this.config.viewConfig.views === undefined) {
            this.config.viewConfig.views = [];
        }
        if (this.config && this.config.viewConfig
            && this.config.viewConfig.currentView === undefined) {
            this.config.viewConfig.currentView = this.config.viewConfig.views[0];
        }
    };
    // Actions
    ToolbarComponent.prototype.handleAction = function (action) {
        if (action && action.disabled !== true) {
            this.onActionSelect.emit(action);
        }
    };
    // Filters
    ToolbarComponent.prototype.clearFilter = function ($event) {
        this.config.filterConfig.appliedFilters = $event;
        this.onFilterChange.emit({
            appliedFilters: $event
        });
    };
    ToolbarComponent.prototype.filterAdded = function ($event) {
        var newFilter = {
            field: $event.field,
            query: $event.query,
            value: $event.value
        };
        if (!this.filterExists(newFilter)) {
            if (newFilter.field.type === 'select') {
                this.enforceSingleSelect(newFilter);
            }
            this.config.filterConfig.appliedFilters.push(newFilter);
            $event.appliedFilters = this.config.filterConfig.appliedFilters;
            this.onFilterChange.emit($event);
        }
    };
    ToolbarComponent.prototype.filterExists = function (filter) {
        var foundFilter = find(this.config.filterConfig.appliedFilters, {
            field: filter.field,
            query: filter.query,
            value: filter.value
        });
        return foundFilter !== undefined;
    };
    ToolbarComponent.prototype.handleFilterFieldSelect = function ($event) {
        this.onFilterFiledSelect.emit($event);
    };
    ToolbarComponent.prototype.handleFilterTypeAhead = function ($event) {
        this.onFilterTypeAhead.emit($event);
    };
    // Sort
    ToolbarComponent.prototype.sortChange = function ($event) {
        this.onSortChange.emit($event);
    };
    // Views
    ToolbarComponent.prototype.isViewSelected = function (view) {
        return this.config.viewConfig && (this.config.viewConfig.currentView.id === view.id);
    };
    ToolbarComponent.prototype.submit = function ($event) {
        $event.preventDefault();
    };
    ToolbarComponent.prototype.viewSelected = function (view) {
        this.config.viewConfig.currentView = view;
        if (!view.disabled) {
            this.onViewSelect.emit(view);
        }
    };
    // Utils
    ToolbarComponent.prototype.enforceSingleSelect = function (filter) {
        remove(this.config.filterConfig.appliedFilters, { title: filter.field.title });
    };
    return ToolbarComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", ToolbarConfig)
], ToolbarComponent.prototype, "config", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], ToolbarComponent.prototype, "actionsTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], ToolbarComponent.prototype, "viewsTemplate", void 0);
__decorate([
    Output('onActionSelect'),
    __metadata("design:type", Object)
], ToolbarComponent.prototype, "onActionSelect", void 0);
__decorate([
    Output('onFilterFieldSelect'),
    __metadata("design:type", Object)
], ToolbarComponent.prototype, "onFilterFiledSelect", void 0);
__decorate([
    Output('onFilterChange'),
    __metadata("design:type", Object)
], ToolbarComponent.prototype, "onFilterChange", void 0);
__decorate([
    Output('onFilterTypeAhead'),
    __metadata("design:type", Object)
], ToolbarComponent.prototype, "onFilterTypeAhead", void 0);
__decorate([
    Output('onSortChange'),
    __metadata("design:type", Object)
], ToolbarComponent.prototype, "onSortChange", void 0);
__decorate([
    Output('onViewSelect'),
    __metadata("design:type", Object)
], ToolbarComponent.prototype, "onViewSelect", void 0);
ToolbarComponent = __decorate([
    Component({
        encapsulation: ViewEncapsulation.None,
        selector: 'pfng-toolbar',
        styles: [require('./toolbar.component.css').toString()],
        template: require('./toolbar.component.html')
    }),
    __metadata("design:paramtypes", [])
], ToolbarComponent);
export { ToolbarComponent };
//# sourceMappingURL=toolbar.component.js.map