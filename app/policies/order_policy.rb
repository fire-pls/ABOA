class OrderPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where(delivered:false)
    end
  end

  def index?
    user.admin
  end

  def show?
    return true
  end

  def create?
    return true
  end

  def update?
    return true
  end

  def destroy?
    return true
  end
end
